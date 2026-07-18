import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed the `middleware` file convention to `proxy`; clerkMiddleware()
// still returns a plain request handler, so it's used here unchanged as the default export.
//
// Route-level protection (createRouteMatcher + auth.protect()) is intentionally NOT used
// here — Clerk deprecated that pattern in favor of resource-based auth checks, since
// path-matching in proxy can drift from actual routes and leave data reachable. The real
// gate for /admin lives in src/app/admin/page.tsx (currentUser() + ADMIN_EMAIL check).
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
