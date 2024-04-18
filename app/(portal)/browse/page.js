import { BASEURL } from "@/app/config/app";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import AppCard from "./app-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Apps</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl mt-4 mb-8">Browse Apps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default Apps;
