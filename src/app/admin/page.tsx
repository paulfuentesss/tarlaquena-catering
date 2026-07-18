import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const metadata: Metadata = {
  title: "Inquiries — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email || email !== process.env.ADMIN_EMAIL) {
    return (
      <main className="flex flex-1 items-center justify-center bg-cream px-6 py-24 text-center">
        <p className="font-heading text-lg font-bold text-ink">Not authorized.</p>
      </main>
    );
  }

  const inquiries = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <main className="flex-1 bg-cream px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-ink">
          Inquiries
        </h1>
        <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-olive text-cream">
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
    </main>
  );
}
