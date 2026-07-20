import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <ViewTransition
          enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
          exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "fade" }}
        >
          {children}
        </ViewTransition>
      </main>
      <Footer />
    </>
  );
}
