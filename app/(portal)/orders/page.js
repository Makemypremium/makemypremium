import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/datatable";
import { Plus } from "lucide-react";
import React from "react";
import { BASEURL } from "@/app/config/app";
import Link from "next/link";
import { columns } from "./column";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/config/auth";

export const revalidate = 0;

async function getData(user) {
  const url = user?.role === "ADMIN" ? "orders" : `orders/user/${user?._id}`;
  const res = await fetch(`${BASEURL}/${url}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data;
}

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session.user?._doc;
  const data = await getData(user);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {user?.role === "ADMIN" ? "Orders" : "Your Orders"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersPage;
