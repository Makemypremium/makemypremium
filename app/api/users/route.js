import dbConnect from "@/lib/connection";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await dbConnect();

  try {
    const users = await User.find({ role: "USER" });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
