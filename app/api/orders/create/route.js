import dbConnect from "@/lib/connection";
import App from "@/models/App";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";
import orderId from "order-id";
import { addDays, addMonths } from "date-fns";

export const POST = async (request) => {
  const { productID, userID, price } = await request.json();

  await dbConnect();

  try {
    const user = await User.findById(userID);
    const app = await App.findById(productID);

    if (!user || !app || !price?.period || !price?.value)
      throw new Error("Invalid Data");

    const order = new Order({
      orderNo: orderId("gfuJJy1sVLPslgQK").generate(),
      productID,
      productName: app.name,
      userID,
      userName: `${user.firstname} ${user.lastname}`,
      price: {
        period: price.period,
        value: price.value,
      },
      expDate: addMonths(new Date(), price.period),
    });

    await order.save();

    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
