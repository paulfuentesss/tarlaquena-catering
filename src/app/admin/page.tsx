import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

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
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-cream px-6 py-24 text-center">
        <p className="font-heading text-lg font-bold text-ink">Sign in to view inquiries.</p>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
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
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-ink">
            Inquiries
          </h1>
          <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-green text-cream">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink/60">
                      No inquiries yet.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="px-4 py-3">{inquiry.name}</td>
                      <td className="px-4 py-3">{inquiry.email}</td>
                      <td className="max-w-xs px-4 py-3">{inquiry.message}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {inquiry.createdAt.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
