import dbConnect from "@/lib/connection";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await dbConnect();

  try {
    const orders = await Order.find();

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
