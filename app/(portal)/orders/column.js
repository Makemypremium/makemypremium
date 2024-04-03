"use client";

import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BASEURL } from "@/app/config/app";
import { format } from "date-fns";

const { default: Image } = require("next/image");

async function onDelete(id) {
  try {
    const res = await fetch(`${BASEURL}/orders/${id}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete order");
  } catch (error) {}
}

export const columns = [
  {
    accessorKey: "orderNo",
    header: "Order No",
    filterable: true,
  },
  {
    accessorKey: "productName",
    header: "App Name",
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");
      return (
        <Button className="m-1" size="sm" variant="outline">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(price.value)}
          <span className="bg-green-600 py-px rounded text-xs px-2 ml-2 inline-block">
            {price.period} months
          </span>
        </Button>
      );
    },
  },
  {
    accessorKey: "expDate",
    header: "Expiry Date",
    cell: ({ row }) => format(row.getValue("expDate"), "dd MMMM yyyy"),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                app and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(row.original._id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];
