import React from "react";
import { authOptions } from "@/app/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const user = session.user._doc;

  if (user.role !== "ADMIN") redirect("/not-authorized");

  return children;
};

export default AdminLayout;
