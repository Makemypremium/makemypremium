import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/datatable";
import { Plus } from "lucide-react";
import React from "react";
import { BASEURL } from "@/app/config/app";
import Link from "next/link";
import { columns } from "./columns";

export const revalidate = 0;

async function getData() {
  const res = await fetch(`${BASEURL}/app`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data;
}

const AppsPage = async () => {
  const data = await getData();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Apps</CardTitle>
          <Button asChild href="/app/create">
            <Link href="/apps/create">
              <Plus className="mr-2 h-4 w-4" /> Create
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default AppsPage;
