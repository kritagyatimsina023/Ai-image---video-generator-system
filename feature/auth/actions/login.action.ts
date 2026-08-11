"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { connectDB } from "@/lib/Mongodb";
import { createToken } from "@/lib/auth";
import User from "@/models/User";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  error?: string;
  hyperLink?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);

  const result = loginSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { email: userEmail, password: userPassword } = result.data;

  try {
    await connectDB();

    const user = await User.findOne({
      email: userEmail.toLowerCase(),
    }).select("+password");

    if (!user) {
      return {
        error: "No user found ! Create an account",
        hyperLink: "/signup",
      };
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.password);

    if (!passwordMatch) {
      return {
        error: "Invalid email or password.",
      };
    }

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
    console.error("Login error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect("/create");
}
