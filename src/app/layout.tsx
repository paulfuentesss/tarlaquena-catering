import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-accent",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarlaquena Catering",
  description:
    "Tarlaquena Catering — full-service catering for buffets, meal boxes, and events.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#377D41",
          colorPrimaryForeground: "#ffffff",
          colorBackground: "#ffffff",
          colorForeground: "#1a1a16",
          colorMuted: "#f0e6d6",
          colorMutedForeground: "#6b6b52",
          colorInput: "#ffffff",
          colorInputForeground: "#1a1a16",
          colorBorder: "#e4d7c1",
          colorRing: "#377D41",
          colorNeutral: "#1a1a16",
          colorDanger: "#DC2626",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-body)",
        },
        elements: {
          card: "shadow-lg rounded-2xl border border-[var(--border)]",
          formButtonPrimary:
            "bg-primary hover:bg-primary-dark text-white normal-case shadow-none",
          formFieldInput:
            "border-[var(--border)] focus:border-primary focus:ring-primary/30",
          footerActionLink: "text-primary hover:text-primary-dark",
          footer: {
            backgroundColor: "#e9e2d6",
          },
          avatarBox: "ring-2 ring-primary/20",
          navbarButton: "text-ink",
          navbarButtonIcon: "text-ink",
          navbar: {
            backgroundColor: "#e9e2d6",
          },
          badge: {
            backgroundColor: "rgba(55, 125, 65, 0.15)",
            color: "#27592e",
            border: "none",
          },
          userButtonPopoverCard: "shadow-lg rounded-2xl border border-[var(--border)]",
          userButtonPopoverActionButton: {
            color: "#1a1a16",
            "&:hover": {
              backgroundColor: "rgba(55, 125, 65, 0.10)",
            },
          },
          userButtonPopoverActionButtonIcon: "text-green",
          userButtonPopoverFooter: {
            backgroundColor: "#e9e2d6",
          },
        },
      }}
    >
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${bricolage.variable} ${fraunces.variable} ${inter.variable} h-full antialiased`}
      >
        <body className="flex min-h-dvh flex-col bg-cream">
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
