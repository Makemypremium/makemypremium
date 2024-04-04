import dbConnect from "@/lib/connection";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = async (request, { params }) => {
  await dbConnect();

  try {
    const orders = await Order.find({ userID: params.id });

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
