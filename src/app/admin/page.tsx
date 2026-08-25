import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { SignIn, UserButton } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { AdminInquiriesTable } from "@/components/admin/admin-inquiries-table";

export const metadata: Metadata = {
  title: "Inquiries — Admin",
  robots: { index: false, follow: false },
};

if (!process.env.ADMIN_EMAIL) {
  throw new Error(
    "ADMIN_EMAIL is not set. Copy .env.example to .env.local and add the admin's email."
  );
}

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  let content;

  if (!user) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-cream px-6 py-24">
        <SignIn routing="hash" />
      </div>
    );
  } else if (email !== process.env.ADMIN_EMAIL) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-cream px-6 py-24 text-center">
        <p className="font-heading text-lg font-bold text-ink">Not authorized.</p>
      </div>
    );
  } else {
    const inquiries = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    content = (
      <div className="flex-1 bg-cream px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-ink">
            Inquiries
          </h1>
          <div className="mt-8">
            <AdminInquiriesTable inquiries={inquiries} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav links={[]} cta={false} end={user && <UserButton />} />
      <main className="flex flex-1 flex-col">{content}</main>
      <Footer />
    </>
  );
}
