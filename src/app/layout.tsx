import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${bricolage.variable} ${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
      >
        <body className="min-h-full flex flex-col bg-cream">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
