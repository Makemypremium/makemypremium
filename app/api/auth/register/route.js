import dbConnect from "@/lib/connection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstname, lastname, email, phone, password } = await request.json();

  await dbConnect();

  try {
    if (await User.findOne({ email })) throw new Error("User already exist");

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role: "USER",
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
};
