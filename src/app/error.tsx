"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlertIcon } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center px-6 py-24 text-center sm:px-10 sm:py-32">
        <TriangleAlertIcon aria-hidden="true" className="size-10 text-primary" />
        <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          Something Went Wrong
        </h1>
        <p className="mt-3 max-w-md font-accent text-lg italic text-ink/70">
          We hit a snag loading this page. Please try again.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button onClick={() => unstable_retry()}>Try Again</Button>
          <Button variant="outline" render={<Link href="/" />}>
            Return Home
          </Button>
        </div>
      </main>
    </>
  );
}
