import { db } from "~/server/db";

export default async function PrivacyPage() {
  const page = await db.page.findUnique({
    where: {
      slug: "privacy-policy",
    },
  });

  return (
    <div
      className="container mx-auto flex w-full max-w-xl flex-col space-y-8 py-16"
      dangerouslySetInnerHTML={{ __html: page?.content ?? "" }}
    ></div>
  );
}
