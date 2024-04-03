import dbConnect from "@/lib/connection";
import App from "@/models/App";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  await dbConnect();

  try {
    const app = await App.deleteOne({ _id: params.id });

    revalidatePath("/apps");
    return NextResponse.json({ data: app }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
