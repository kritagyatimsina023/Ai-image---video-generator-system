import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/Mongodb";
import Credit from "@/models/Credits";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          credits: 0,
        },
        {
          status: 401,
        },
      );
    }
    await connectDB();
    const credit = await Credit.findOne({
      userId: user.userId,
    })
      .select("credits")
      .lean();

    return NextResponse.json({
      credit: credit?.credits ?? 0,
    });
  } catch (error) {
    console.error("Credit fetch error", error);

    return NextResponse.json(
      {
        error: "Failed to Fetch Credits",
      },
      {
        status: 500,
      },
    );
  }
}
