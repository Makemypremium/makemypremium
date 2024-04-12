"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BASEURL, WHATSAPPNUMBER } from "@/app/config/app";
import { toast } from "@/components/ui/use-toast";
import { Loader2, ShoppingBag } from "lucide-react";

const BuyNow = ({ app }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

      const result = await res.json();

      toast({
        title: "We received your buy request",
        description: "Please wait till we redirect you through whatsapp",
      });

      window
        .open(
          `https://api.whatsapp.com/send?phone=${WHATSAPPNUMBER}&text=${encodeURI(
            `Hey, I am interested in purchasing your product \nOder: ${
              result.data.orderNo
            }\nProduct: ${
              result.data.productName
            }\nPlan: ${new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(result.data.price.value)} - ${
              result.data.price.period
            } months`
          )}`,
          "_blank"
        )
        .focus();
    } catch (error) {
      console.log(error, 111111111);
      toast({
        title: "Your order was not successfull",
        description: "Please try again later or reach us",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return data?.user?._doc?.role === "USER" ? (
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
              <DropdownMenuItem onClick={() => onBuy(priceModel)} key={index}>
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
  ) : null;
};

export default BuyNow;
