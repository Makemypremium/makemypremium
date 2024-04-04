import dbConnect from "@/lib/connection";
import App from "@/models/App";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = async (request, { params }) => {
  await dbConnect();

  try {
    const app = await App.findById(params.id);

    return NextResponse.json({ data: app }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
