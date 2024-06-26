import dbConnect from "@/lib/connection";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  await dbConnect();

  try {
    const order = await Order.deleteOne({ _id: params.id });

    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
