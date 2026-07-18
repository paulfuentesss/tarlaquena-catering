import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Menu", href: "/menu", active: true },
  { label: "About", href: "#", active: false },
  { label: "Blog", href: "#", active: false },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-heading text-xl font-extrabold tracking-tight text-ink">
          Tarlaquena Catering
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) =>
            link.active ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-coral"
              >
                {link.label}
              </Link>
            ) : (
              <span
                key={link.label}
                aria-disabled="true"
                className="cursor-not-allowed text-sm font-medium text-ink/40"
              >
                {link.label}
              </span>
            )
          )}
        </nav>
        <Button size="sm" render={<a href="#contact" />}>
          Get a Quote
        </Button>
      </div>
    </header>
  );
}
