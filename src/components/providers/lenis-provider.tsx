"use client";

import { useLayoutEffect, useSyncExternalStore, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { usePathname } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// No window on the server — treat as reduced-motion so Lenis never mounts before
// the client's real preference is known, avoiding a flash of Lenis-then-not.
function getReducedMotionServerSnapshot() {
  return true;
}

// `root` mode (no custom wrapper/content divs) animates the native window/document
// scroll position instead of a transformed wrapper — do not switch this to a custom
// wrapper/content setup, it's what keeps the sticky nav header working unmodified.
// The anchors offset leaves room for the sticky header (~68px tall) so an anchor
// target like #contact doesn't land clipped underneath it.
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  anchors: { offset: -72 },
};

// Safety net for navigations that don't go through nav.tsx's manual scrollTo reset
// (e.g. browser back/forward). Must live inside <ReactLenis> to reach useLenis().
function ScrollResetOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Unknown (pre-hydration) or reduced-motion: render plain children, no Lenis JS at all.
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollResetOnRouteChange />
      {children}
    </ReactLenis>
  );
}
