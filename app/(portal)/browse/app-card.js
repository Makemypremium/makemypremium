"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { BASEURL } from "@/app/config/app";
import { useSession } from "next-auth/react";

const AppCard = ({ app }) => {
  const [loading, setLoading] = useState(false);
  const { data } = useSession();

  const onBuy = async (price) => {
    setLoading(true);

    const url = `orders/create`;
    const method = "POST";

    try {
      const res = await fetch(`${BASEURL}/${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: data?.user?._doc?._id,
          productID: app._id,
          price,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      toast({
        title: "We received your buy request",
        description: "Please wait for us to reach you shortly",
      });
    } catch (error) {
      toast({
        title: "Your order was successfull",
        description: "Please try again later or reach us",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${app.cover})` }}
    >
      <div className="bg-secondary absolute inset-0 opacity-50"></div>
      <CardContent className="relative">
        <div className="h-24"></div>
        <div className="flex items-end justify-between">
          <div className="w-16 h-16 relative rounded-md overflow-hidden shadow-md">
            <Image src={app.logo} fill={true} />
          </div>

          {data?.user?._doc?.role === "USER" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="shadow-sm" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingBag className="mr-2 h-4 w-4" />
                  )}{" "}
                  Buy
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose Plan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {app.prices.length > 0
                  ? app.prices.map((priceModel, index) => (
                      <DropdownMenuItem
                        onClick={() => onBuy(priceModel)}
                        key={index}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(priceModel.value)}
                        <span className="bg-green-700 px-2 text-sm rounded-md ml-2 text-white">
                          {priceModel.period} months
                        </span>
                      </DropdownMenuItem>
                    ))
                  : null}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCard;
