import type { Metadata } from "next";
import Link from "next/link";
import { CompassIcon } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="flex flex-col items-center px-6 py-24 text-center sm:px-10 sm:py-32">
          <CompassIcon aria-hidden="true" className="size-10 text-primary" />
          <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 max-w-md font-accent text-lg italic text-ink/70">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          </p>
          <Button className="mt-8" render={<Link href="/" />}>
            Return Home
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
