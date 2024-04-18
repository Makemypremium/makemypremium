import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../config/auth";
import PortalSidebar from "./sidebar";
import PortalNavbar from "./navbar";

const PortalLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin?callbackUrl=Alreadylogged");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <PortalSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PortalNavbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
