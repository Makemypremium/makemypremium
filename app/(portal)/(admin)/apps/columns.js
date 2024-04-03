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

const { default: Image } = require("next/image");

async function onDelete(id) {
  try {
    const res = await fetch(`${BASEURL}/app/${id}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete app");
  } catch (error) {}
}

export const columns = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <Image src={row.getValue("logo")} width={34} height={34} />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    filterable: true,
  },
  {
    accessorKey: "prices",
    header: "Prices",
    cell: ({ row }) => {
      const prices = row.getValue("prices") ?? [];
      return prices.map((p) => (
        <Button className="m-1" size="sm" variant="outline">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(p.value)}
          <span className="bg-green-600 py-px rounded text-xs px-2 ml-2 inline-block">
            {p.period} months
          </span>
        </Button>
      ));
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (row.getValue("featured") ? <Check /> : ""),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/apps/${row.original._id}/update`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
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
