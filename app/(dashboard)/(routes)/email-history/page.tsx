import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { EmailHistoryClient } from "./EmailHistoryClient";

const EmailHistoryPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const emails = await prismadb.userEmailHistory.findMany({
    where: {
      userId: userId
    }
  });

  console.log("emails are : " + JSON.stringify(emails));

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <EmailHistoryClient initialEmails={emails} />
    </div>
  );
};

export default EmailHistoryPage;
