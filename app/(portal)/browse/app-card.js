"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { BASEURL, WHATSAPPNUMBER } from "@/app/config/app";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BuyNow from "./buy";

const AppCard = ({ app }) => {
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
        className="bg-cover bg-no-repeat cursor-pointer hover:border-gray-400 overflow-hidden"
        style={{ backgroundImage: `url(${app.cover})` }}
        onClick={() => router.push(`/browse/${app._id}`)}
      >
        <div className="bg-secondary absolute inset-0 opacity-50"></div>
        <CardContent className="relative">
          <div className="h-24"></div>
          <div className="flex items-end justify-between relative">
            <div className="w-16 h-16 relative rounded-md overflow-hidden shadow-md">
              <Image src={app.logo} fill={true} />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="absolute bottom-6 right-6">
        <BuyNow app={app} />
      </div>
    </div>
  );
};

export default AppCard;
