import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AppForm from "../../form";
import { BASEURL } from "@/app/config/app";

export const revalidate = 0;

async function getData(id) {
  const res = await fetch(`${BASEURL}/app/${id}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data;
}

const AppUpdate = async ({ params }) => {
  const data = await getData(params.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update App</CardTitle>
      </CardHeader>
      <CardContent>
        <AppForm type="update" data={{ ...data, _id: params.id }} />
      </CardContent>
    </Card>
  );
};

export default AppUpdate;
