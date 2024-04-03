import dbConnect from "@/lib/connection";
import { slugify } from "@/lib/utils";
import App from "@/models/App";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, description, logo, cover, prices, featured, status } =
    await request.json();

  await dbConnect();

  try {
    const path = slugify(name);

    const app = new App({
      name,
      description,
      path,
      logo,
      cover,
      prices,
      featured,
      status,
    });

    await app.save();

    revalidatePath("/apps");
    return NextResponse.json(
      { message: "App created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
