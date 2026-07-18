---
name: work-branch
description: Start, checkpoint, or finish a solo work set on this repo — creates a type/short-desc branch off main before new work, "save" commits progress locally without a PR, and "finish" commits, pushes, and opens a PR with a generated description. Use when the user says "new branch", "start work on X", "just commit this", "commit only, no PR yet", "ship this", "wrap this up", "open a PR", "finish this work set", or runs /work-branch.
argument-hint: [start <short description>|save|finish]
---

# Work Branch

Solo-dev workflow for this repo (single dev, no `dev` branch — see AGENTS.md/CLAUDE.md context). Three phases, auto-detected from current git state unless the user names one explicitly via `$ARGUMENTS`.

- If `$ARGUMENTS` starts with `start`, or the current branch is `main`/`master` and the user is about to begin new work → **Start phase**.
- If `$ARGUMENTS` starts with `save`, or the user says something like "just commit this", "commit only", "no PR yet" → **Save phase**.
- If `$ARGUMENTS` starts with `finish`, or the user says "ship this" / "open a PR" → **Finish phase**.

## Branch naming

`type/short-desc`, both kebab-case, e.g. `feat/contact-form`, `fix/admin-auth`, `chore/upgrade-clerk`. Infer `type` from the nature of the work:

- `feat` — new functionality
- `fix` — bug fix
- `chore` — deps, config, tooling, non-behavioral cleanup
- `docs` — documentation only
- `refactor` — restructuring without behavior change
- `test` — tests only

`short-desc` is 2-4 words summarizing the work. If the user's request doesn't make type/desc obvious, ask in one line rather than guessing.

## Start phase

1. `git status` — if there are uncommitted changes, tell the user what they are and confirm whether those changes belong on the new branch (they'll carry over automatically) or should stay separate. Don't stash without asking.
2. Make sure `main` is current: `git fetch origin main` then check `git status` relative to `origin/main`. If local `main` is behind, ask before pulling (never force).
3. Determine `type/short-desc` from the task at hand (ask if unclear).
4. `git checkout main && git pull --ff-only && git checkout -b <type/short-desc>`
5. Confirm the new branch name to the user and what happens next (they work, then invoke `/work-branch finish` or just say "ship this" when done).

## Save phase

Commits current progress on the working branch — no push, no PR. Use this for a mid-work checkpoint when the user isn't ready to ship yet. Never run this on `main`/`master` (if there are uncommitted changes on `main`, tell the user and suggest `/work-branch start` first instead).

1. `git status`, `git diff` (unstaged), `git diff --staged` — if there's nothing to commit, say so and stop.
2. Review untracked/modified files before staging. Never blanket `git add -A`. Flag anything that looks like a secret (`.env`, `.env.local`, credentials, keys) and exclude it.
3. Stage the relevant files. Draft a commit title and body from the actual diff — title short and specific, body around *why* where it isn't obvious from the diff alone. Confirm the drafted message with the user before committing (unlike Finish, Save is a checkpoint the user may want to review, so a quick confirmation here is worth it). End the body with:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   ```
4. Commit locally. Do **not** push. Tell the user it's committed locally only, and that `/work-branch finish` (or "ship this") will push and open the PR whenever they're ready.

## Finish phase

This phase pushes and opens a PR automatically — that's the automation the user explicitly asked for when this skill was set up, so it does not need a fresh confirmation prompt each time. It still must never force-push, push directly to `main`, or skip hooks.

1. Run in parallel: `git status`, `git diff` (unstaged), `git diff --staged`, `git log main..HEAD --oneline` (or against `origin/main` if that's more current).
2. If there's nothing staged, unstaged, or committed beyond `main`, tell the user there's nothing to ship and stop.
3. Review untracked/modified files before staging. Never blanket `git add -A`. Flag anything that looks like a secret (`.env`, `.env.local`, credentials, keys) and exclude it — don't stage it even if the user seems to expect it.
4. Stage the relevant files and commit. If there are already commits on the branch from the work session, a fixup commit for remaining changes is fine — don't rewrite prior commits. Write the commit message body around *why*, matching this repo's existing style (see `git log` for tone/format precedent). End the commit body with:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   ```
5. Push: `git push -u origin <branch>`.
6. Check whether a PR already exists for this branch (`gh pr view --json url 2>/dev/null`). If yes, the branch just needed more commits pushed — report the existing PR URL and stop (don't create a duplicate).
7. If no PR exists, draft title (short, <70 chars) and body from the full set of commits/diff on the branch (not just the latest commit), then:
   ```
   gh pr create --title "..." --body "$(cat <<'EOF'
   ## Summary
   - ...

   ## Test plan
   - [ ] ...
   EOF
   )"
   ```
8. Report the PR URL back to the user.
