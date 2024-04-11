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

  return (
    <div>
      <div
        className="hidden md:block bg-cover bg-no-repeat h-72 rounded relative"
        style={{ backgroundImage: `url(${app.cover})` }}
      >
        <div className="bg-secondary absolute inset-0 opacity-50"></div>
      </div>

      <div className="px-4 md:px-8 md:-mt-16 flex items-end">
        <div className="w-32 h-32 relative rounded-md overflow-hidden shadow-md border-4">
          <Image src={app.logo} fill={true} />
        </div>

        <div className="ml-4 mb-3">
          <BuyNow app={app} />
        </div>
      </div>

      <div className="px-4 md:px-8 py-4">
        <p dangerouslySetInnerHTML={{ __html: app.description }} />

        {app.prices.length > 0 ? (
          <Card className="my-4 max-w-full md:w-64">
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
      </div>
    </div>
  );
};

export default AppPage;
