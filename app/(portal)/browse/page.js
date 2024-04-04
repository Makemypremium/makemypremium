import { BASEURL } from "@/app/config/app";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import AppCard from "./app-card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const res = await fetch(`${BASEURL}/app`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data ?? [];
}

const Apps = async () => {
  const apps = await getData();

  return (
    <div>
      <h1 className="text-xl mb-8">Browse Apps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default Apps;
