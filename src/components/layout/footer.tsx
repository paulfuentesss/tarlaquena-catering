import type { SVGProps } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Phone, Smartphone, MapPin, Mail } from "lucide-react";
import { contactInfo } from "@/lib/content/contact";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MessengerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.13 2 11.25c0 2.9 1.44 5.49 3.69 7.19V22l3.38-1.86c.9.25 1.87.38 2.93.38 5.52 0 10-4.13 10-9.27S17.52 2 12 2z"
      />
      <path fill="#377d41" d="m12.75 6.5-4.7 6.5h4l-1.1 4.5 5-6.5h-4l1.3-4.5z" />
    </svg>
  );
}

export async function Footer() {
  const qrCodeSvg = await QRCode.toString(contactInfo.messengerUrl, {
    type: "svg",
    margin: 0,
    color: { dark: "#27592e", light: "#fbf3e9" },
  });

  return (
    <footer className="border-t border-border/60 bg-green px-6 py-10 text-cream sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold">Tarlaquena Catering</p>
            <p className="font-accent text-base italic text-cream/70">
              Where Good Food and Good Service Meet
            </p>
            <a
              href={contactInfo.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 hover:opacity-90"
            >
              <span
                className="size-20 shrink-0 overflow-hidden rounded-md bg-cream p-1.5 [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
              />
              <span className="text-sm text-cream/80">
                Scan or tap to
                <br />
                chat with us
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm text-cream/80">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-cream">
              Quick Links
            </p>
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-cream/80">
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-cream">
              Contact Us
            </p>
            <a href={`tel:${contactInfo.mobile}`} className="flex items-center gap-2 hover:text-white">
              <Smartphone className="size-4 shrink-0" />
              {contactInfo.mobile}
            </a>
            <a href={`tel:${contactInfo.mobile2}`} className="flex items-center gap-2 hover:text-white">
              <Smartphone className="size-4 shrink-0" />
              {contactInfo.mobile2}
            </a>
            <a href={`tel:${contactInfo.landline}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4 shrink-0" />
              {contactInfo.landline}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4 shrink-0" />
              {contactInfo.email}
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={contactInfo.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="hover:text-white"
              >
                <MessengerIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-cream/10 pt-4 text-sm text-cream/70">
          &copy; {new Date().getFullYear()} Tarlaquena Catering. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
