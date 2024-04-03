import dbConnect from "@/lib/connection";
import App from "@/models/App";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await dbConnect();

  try {
    const apps = await App.find();

    return NextResponse.json({ data: apps }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
