import dbConnect from "@/lib/connection";
import { slugify } from "@/lib/utils";
import App from "@/models/App";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { name, description, logo, cover, prices, featured, status } =
    await request.json();

  await dbConnect();

  try {
    const app = await App.updateOne(
      { _id: params.id },
      {
        name,
        description,
        logo,
        cover,
        prices,
        featured,
        status,
      }
    );

    revalidatePath("/apps");
    // revalidatePath(`/apps/${params.id}/update`);
    return NextResponse.json(
      { message: "App Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
