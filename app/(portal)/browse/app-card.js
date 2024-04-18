"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { BASEURL, WHATSAPPNUMBER } from "@/app/config/app";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BuyNow from "./buy";
import { toPrice } from "@/lib/utils";

const AppCard = ({ app }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  const priceRange =
    app.prices.length > 0
      ? [app.prices[0], app.prices[app.prices.length - 1]]
      : null;

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

      setTimeout(
        () =>
          router.push(
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
            )}`
          ),
        2000
      );
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
    <div className="relative">
      <Card
        className="cursor-pointer hover:border-gray-400 overflow-hidden"
        onClick={() => router.push(`/browse/${app._id}`)}
      >
        <div
          className="bg-cover bg-no-repeat relative h-20"
          style={{ backgroundImage: `url(${app.cover})` }}
        >
          <div className="bg-secondary absolute inset-0 opacity-50"></div>
        </div>
        <CardContent className="relative -mt-14">
          <div className="flex justify-center relative">
            <div className="w-28 h-28 relative rounded-md overflow-hidden border-4 border-card">
              <Image src={app.logo} fill={true} />
            </div>
          </div>
          {priceRange?.length > 0 && (
            <span className="mt-3 mb-2 block">
              {toPrice(priceRange[0].value)} - {toPrice(priceRange[1].value)}
            </span>
          )}
          <h6 className="text-lg font-semibold leading-tight">{app.name}</h6>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppCard;
