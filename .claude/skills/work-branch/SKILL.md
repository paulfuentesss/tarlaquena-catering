---
name: work-branch
description: Fully automatic commit/push/PR workflow for solo dev work on this repo. "commit" stages and commits everything with an auto-generated message (auto-branching off main if needed); "push" also pushes and refreshes the PR if one exists; "done" does all of that and opens a PR if none exists yet. Use when the user types exactly "commit", "push", or "done", or runs /work-branch with one of those arguments.
argument-hint: [commit|push|done]
---

# Work Branch

Solo-dev workflow for this repo (single dev, no `dev` branch — see AGENTS.md/CLAUDE.md context). Fully automatic: branch naming, commit messages, and PR descriptions are all auto-generated with no confirmation step. The only things that ever stop and ask are genuine safety concerns — a detected secret, a failed hook, an unexplained `gh`/git failure, or a stale branch with commits that don't obviously belong anywhere.

## Trigger matching

Match `$ARGUMENTS` (trimmed, case-insensitive) exactly:

- `commit` → **Commit phase**
- `push` → **Push phase**
- `done` → **Done phase**

Nothing else triggers this skill — no natural-language phrase matching.

## Branch naming

`type/short-desc`, both kebab-case, e.g. `feat/contact-form`, `fix/admin-auth`, `chore/upgrade-clerk`. Infer `type` from the nature of the actual diff:

- `feat` — new functionality
- `fix` — bug fix
- `chore` — deps, config, tooling, non-behavioral cleanup
- `docs` — documentation only
- `refactor` — restructuring without behavior change
- `test` — tests only

`short-desc` is 2-4 words summarizing the work. Best-effort inference, no confirmation — pick the closest fit and note the chosen name in the final report so the user sees what was picked.

## Shared preflight

Every phase below starts here.

1. `git branch --show-current`.
2. **If not on `main`/`master`, check staleness** — don't discard stderr, the distinction matters (see Failure handling):
   - `gh pr view "$branch" --json state,url` — if it succeeds and `state` is `MERGED` or `CLOSED`, the branch is stale.
   - If that call fails with stderr matching `no pull requests found`, that just means no PR exists yet — not stale, not an error.
   - Any other failure (auth, network, timeout, rate limit) — stop, see Failure handling. Don't guess.
   - If not already stale from the PR check: if the branch has an upstream (`git rev-parse --abbrev-ref --symbolic-full-name @{u}` succeeds) but `git ls-remote --heads origin "$branch"` comes back empty, the remote ref was deleted after being pushed — stale. (A branch that was *never* pushed also has no upstream — that's normal, not stale; check upstream first.)
3. **If stale, check for local-only commits before doing anything else**: `git log origin/main..HEAD --oneline` (or `main..HEAD` if no upstream). If this is non-empty *and* the working tree is clean (no uncommitted changes) — stop. This is the common squash-merge case: GitHub's default merge strategy leaves local commits that were never fast-forwarded into `main`, even though the work is genuinely already merged. Tell the user the branch's PR was merged/closed but it still carries local commits, and ask what to do — don't guess whether to discard, re-push, or branch fresh.
4. **Branch creation** — only if on `main`/`master` (or determined stale above) **and there are uncommitted/staged changes** to carry over:
   - `git fetch origin main`; if local `main` is behind `origin/main`, fast-forward pull (never force).
   - Infer `type/short-desc` from the actual diff (see Branch naming above).
   - `git checkout main && git checkout -b <type/short-desc>` — uncommitted changes carry over automatically.
   - Note the new branch name for the final report.
   - If on `main`/`master` (or stale) with a **clean tree**: don't create an empty branch just to have one. Let the phase's own "nothing to do" check report the state (e.g. "you're on `main`, nothing to do" or "this branch's PR was already merged and there's nothing new to carry over — no branch created; the next `commit` with real changes will branch automatically").
5. **Review untracked/modified files.** Never blanket `git add -A`. Flag anything that looks like a secret (`.env`, `.env.local`, credentials, keys) — exclude it from staging (and unstage it if it came in already staged), and say so explicitly in the final report. This is the one thing that's never silent.

## Commit phase (`commit`)

Commits current progress on the working branch. No push.

1. Run the shared preflight above.
2. `git diff` / `git diff --staged` — if there's nothing to commit (and no branch was just created), say so and stop.
3. Stage the relevant files (excluding anything flagged in preflight step 5).
4. Draft a commit title and body from the actual diff. Title uses a [Conventional Commits](https://www.conventionalcommits.org/) prefix matching the branch type (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`), e.g. `feat: add view transition animations for site nav`. No confirmation — commit immediately. End the body with:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   ```
5. Report: branch name (flag if newly created), commit summary, anything excluded as a secret.

## Push phase (`push`)

Pushes the branch and keeps its PR in sync, if one exists. Superset of Commit — if there's uncommitted work, it gets committed first.

1. Run the shared preflight above.
2. If there are uncommitted/staged changes, run Commit phase steps 3-4 inline first.
3. If there's nothing to push at all (nothing just committed, nothing already ahead of the remote), say so and stop.
4. `git push -u origin <branch>`.
5. `gh pr view "$branch" --json number,url,body`:
   - If a PR exists: regenerate **only the `## Summary` section** from the full `main..HEAD` diff/commit list, then `gh pr edit <number> --body "..."`. Leave the title untouched, and leave the existing `## Test plan` section (and its checked/unchecked boxes) exactly as-is — overwriting the whole body every push would silently wipe out progress the user already tracked on GitHub. Report the PR URL.
   - If no PR exists: report that the branch was pushed. Don't create a PR here — that's `done`'s job.

## Done phase (`done`)

Finishes the work: commits anything pending, pushes, and makes sure a PR exists.

1. Run the shared preflight above.
2. If there's nothing staged, unstaged, or committed beyond `main`/`origin/main` (and no branch was just created with real changes), say so and stop.
3. If there are uncommitted/staged changes, run Commit phase steps 3-4 inline first.
4. `git push -u origin <branch>`.
5. `gh pr view "$branch" --json number,url`:
   - If a PR already exists: refresh its body the same way as the Push phase, report the URL, stop (don't create a duplicate).
   - If none exists: draft title (<70 chars, Conventional Commits prefix matching the branch type, e.g. `feat: add site page transitions`) and body from the full commit/diff range on the branch, then:
     ```
     gh pr create --title "..." --body "$(cat <<'EOF'
     ## Summary
     - ...

     ## Test plan
     - [ ] ...
     EOF
     )"
     ```
6. Report the PR URL.

## Failure handling

These stop the workflow and report instead of guessing or retrying:

- **Pre-commit hook fails** during any auto-commit (Commit phase, or the inline commit step inside Push/Done): stop immediately, show the hook's output, don't retry and don't re-run with `--no-verify`. The user fixes it and re-runs the command.
- **`gh` fails for a reason other than "not found"** (auth error, rate limit, offline, timeout) during the staleness check or a PR lookup: only `no pull requests found for branch "..."` (exit 1) means "no PR yet" — treat any other failure as real and stop, don't assume the branch is safe to commit onto or that no PR exists.
- **`git push` is rejected** (remote diverged, branch protection, etc.): stop and report; never force-push to resolve it.
- **Stale branch with local-only commits and a clean tree** (the squash-merge case, see preflight step 3): stop and ask rather than guessing what to do with those commits.

## Guardrails

- Never force-push, never push directly to `main`, never skip hooks.
- Never delete or overwrite anything without the user asking — this skill only ever adds commits, branches, and PRs.
- Secrets are always excluded and always reported, even though everything else runs silently.
