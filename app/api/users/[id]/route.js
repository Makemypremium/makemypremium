import dbConnect from "@/lib/connection";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await dbConnect();

  try {
    const user = await User.findById(params.id);

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
