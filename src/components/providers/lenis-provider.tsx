"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { usePathname } from "next/navigation";

// `root` mode (no custom wrapper/content divs) animates the native window/document
// scroll position instead of a transformed wrapper — do not switch this to a custom
// wrapper/content setup, it's what keeps the sticky nav header working unmodified.
// The anchors offset leaves room for the sticky header (~68px tall) so an anchor
// target like #contact doesn't land clipped underneath it.
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  anchors: { offset: -96 },
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Unknown (pre-mount) or reduced-motion: render plain children, no Lenis JS at all.
  if (prefersReducedMotion !== false) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollResetOnRouteChange />
      {children}
    </ReactLenis>
  );
}
