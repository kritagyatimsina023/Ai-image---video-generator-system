"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { connectDB } from "@/lib/Mongodb";
import User from "@/models/User";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";
import Credit from "@/models/Credits";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupState = {
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function signupAction(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const result = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        error: "An account with this email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await Credit.create({
      userId: user._id,
      credits: 30,
    });

    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error("Signup error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect("/create");
}
