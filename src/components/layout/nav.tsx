"use client";

import { useState, type ReactNode, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ContactDialog } from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";

export type NavLink = { label: string; href: string; active: boolean };

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/", active: true },
  { label: "Our Story", href: "/about", active: true },
  { label: "Menu", href: "/menu", active: true },
];

function navTransitionType(href: string): "nav-forward" | "nav-back" | undefined {
  if (href === "/") return "nav-back";
  if (href === "/about") return "nav-forward";
  if (href === "/menu") return "nav-forward";
  return undefined;
}

// `<Link transitionTypes>` is dropped by this Next.js build's link.js before it
// reaches router.push, so the type never reaches the ViewTransition — drive the
// navigation through useRouter().push() instead, which does forward it.
function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return !(event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}

function NavLinkItem({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const isCurrent = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

  if (!link.active) {
    return (
      <span aria-disabled="true" className="cursor-not-allowed text-sm font-medium text-ink/40">
        {link.label}
      </span>
    );
  }

  const transitionType = navTransitionType(link.href);

  return (
    <Link
      href={link.href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={(event) => {
        onClick?.();
        if (!isPlainLeftClick(event)) return;
        event.preventDefault();
        router.push(link.href, {
          scroll: false,
          ...(transitionType ? { transitionTypes: [transitionType] } : {}),
        });
      }}
      className={`relative py-1 text-sm transition-colors hover:text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:content-[''] ${
        isCurrent
          ? "font-semibold text-primary after:scale-x-100"
          : "font-medium text-ink after:scale-x-0"
      }`}
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
  const router = useRouter();
  const pathname = usePathname();
  const hasContactAnchor = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          onClick={(event) => {
            if (!isPlainLeftClick(event)) return;
            event.preventDefault();
            router.push("/", { scroll: false, transitionTypes: ["nav-back"] });
          }}
          className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight text-ink"
        >
          <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
          Tarlaquena Catering
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <NavLinkItem key={link.label} link={link} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {cta &&
            (hasContactAnchor ? (
              // eslint-disable-next-line jsx-a11y/anchor-has-content -- Base UI's render prop injects the Button's children into this anchor
              <Button size="default" render={<a href="#contact" />}>
                Inquire Now
              </Button>
            ) : (
              <ContactDialog trigger={<Button size="default">Inquire Now</Button>} />
            ))}
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
