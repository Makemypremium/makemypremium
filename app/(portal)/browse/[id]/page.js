import { BASEURL } from "@/app/config/app";
import Image from "next/image";
import React from "react";
import BuyNow from "../buy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData(id) {
  const res = await fetch(`${BASEURL}/app/${id}`);

  if (!res.ok) throw new Error("Failed to fetch data");

  const result = await res.json();

  return result.data;
}

const AppPage = async ({ params }) => {
  const app = await getData(params.id);

  const priceRange =
    app.prices.length > 0
      ? [app.prices[0], app.prices[app.prices.length - 1]]
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 flex items-center justify-center sm:justify-start lg:justify-center py-8 lg:py-16">
        <div className="w-40 h-40 lg:w-60 lg:h-60 relative rounded-md overflow-hidden shadow-md">
          <Image src={app.logo} fill={true} />
        </div>
      </div>

      <div className="col-span-2 px-4 text-center md:text-left">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Apps</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{app.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-6 mb-3 text-2xl md:text-4xl text-left">{app.name}</h1>
        {priceRange?.length > 0 && (
          <span className="mb-2 block text-xl md:text-3xl font-semibold text-muted-foreground text-left">
            {toPrice(priceRange[0].value)} - {toPrice(priceRange[1].value)}
          </span>
        )}
        <div
          className="my-4 text-left"
          dangerouslySetInnerHTML={{ __html: app.description }}
        />

        {app.prices.length > 0 ? (
          <Card className="my-4 max-w-full md:w-80 text-left">
            <CardContent className="px-4 py-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {app.prices.map((priceModel, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {priceModel.period}{" "}
                        {priceModel.period > 1 ? "months" : "month"}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(priceModel.value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : null}

        <BuyNow app={app} className="w-80 max-w-full" />
      </div>
    </div>
  );
};

export default AppPage;
