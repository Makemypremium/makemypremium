import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/datatable";
import React from "react";
import { BASEURL } from "@/app/config/app";
import { columns } from "./column";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData(user) {
  const url = "users";
  const res = await fetch(`${BASEURL}/${url}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data;
}

const UsersPage = async () => {
  const data = await getData();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default UsersPage;
