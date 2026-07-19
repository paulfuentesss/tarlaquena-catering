"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type NavLink = { label: string; href: string; active: boolean };

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/", active: true },
  { label: "Menu", href: "/menu", active: true },
  { label: "About", href: "#", active: false },
  { label: "Blog", href: "#", active: false },
];

function NavLinkItem({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  if (!link.active) {
    return (
      <span aria-disabled="true" className="cursor-not-allowed text-sm font-medium text-ink/40">
        {link.label}
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className="text-sm font-medium text-ink transition-colors hover:text-coral"
    >
      {link.label}
    </Link>
  );
}

export function Nav({
  links = defaultNavLinks,
  cta = true,
  end,
}: {
  links?: NavLink[];
  cta?: boolean;
  end?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-heading text-xl font-extrabold tracking-tight text-ink">
          Tarlaquena Catering
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <NavLinkItem key={link.label} link={link} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {cta && (
            // eslint-disable-next-line jsx-a11y/anchor-has-content -- Base UI's render prop injects the Button's children into this anchor
            <Button size="sm" render={<a href="#contact" />}>
              Inquire Now
            </Button>
          )}
          {end}
          {links.length > 0 && (
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-ink transition-colors hover:bg-muted sm:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          )}
        </div>
      </div>
      {open && links.length > 0 && (
        <nav className="flex flex-col gap-1 border-t border-border/60 bg-cream px-6 py-4 sm:hidden">
          {links.map((link) => (
            <div key={link.label} className="py-2">
              <NavLinkItem link={link} onClick={() => setOpen(false)} />
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
