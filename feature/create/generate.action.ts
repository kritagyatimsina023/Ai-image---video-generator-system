"use server";

import { z } from "zod";

import { generateSchema } from "@/schema/Global.schema";
import Generate from "@/models/Generate";
import { connectDB } from "@/lib/Mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { GenerateActionState } from "./generate.types";
import { revalidatePath } from "next/cache";
import Credit from "@/models/Credits";
import Activity from "@/models/Activity";
import User from "@/models/User";
import { invalidate } from "@/lib/cache/invalidate";

const DUMMY_IMAGE_URL =
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455";

const DUMMY_VIDEO_URL =
  "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";

const GENERATION_COST = {
  image: 8,
  video: 15,
} as const;

export async function generateAction(
  prevState: GenerateActionState,
  formData: FormData,
): Promise<GenerateActionState> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "You must be logged in",
        fieldErrors: {},
        generation: null,
      };
    }
    const userData = await User.findById(user.userId);
    if (!userData) {
      throw new Error("No user found");
    }

    const rawData = {
      prompt: formData.get("prompt"),
      type: formData.get("type"),
      model: formData.get("model"),
      ratio: formData.get("ratio"),
    };
    console.log(rawData);

    const validatedData = generateSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        error: "",
        fieldErrors: z.flattenError(validatedData.error).fieldErrors,
        generation: null,
      };
    }

    const { prompt, type, model, ratio } = validatedData.data;

    await connectDB();

    const cost = GENERATION_COST[type];

    const mediaUrl = type === "video" ? DUMMY_VIDEO_URL : DUMMY_IMAGE_URL;

    const credit = await Credit.findOne({
      userId: user.userId,
    });

    if (!credit) {
      return {
        success: false,
        error: "Credit account not found",
        generation: null,
        fieldErrors: {},
      };
    }

    const creditUpdate = await Credit.findOneAndUpdate(
      {
        userId: user.userId,

        credits: {
          $gte: cost,
        },
      },
      {
        $inc: {
          credits: -cost,
        },
      },
      {
        new: true,
      },
    );
    if (!creditUpdate) {
      return {
        success: false,
        error:
          type == "image"
            ? "You don't have enough credits to generate an image"
            : "You don't have enough credits to generate an video",
        fieldErrors: {},
        generation: null,
      };
    }

    const generation = await Generate.create({
      userId: user.userId,
      prompt,
      model,
      type,
      ratio,
      mediaUrl,
    });
    if (type === "image") {
      await Credit.updateOne(
        { userId: user.userId },
        { $inc: { imageCredits: -1 } },
      );
    }

    if (type === "video") {
      await Credit.updateOne(
        {
          userId: user.userId,
        },
        {
          $inc: { videoCredits: -1 },
        },
      );
    }
    const activityType =
      type === "image" ? "IMAGE_GENERATED" : "VIDEO_GENERATED";

    await new Promise((resolve) => setTimeout(resolve, 4000));
    await Activity.create({
      userId: user.userId,
      type: activityType,
      description:
        activityType == "IMAGE_GENERATED"
          ? `${userData.name} Generated image`
          : `${userData.name} Generated Video`,
    });
    revalidatePath("/create");
    invalidate.generation();
    return {
      success: true,
      error: "",
      fieldErrors: {},
      generation: {
        id: generation._id.toString(),
        prompt: generation.prompt,
        model: generation.model,
        type: generation.type,
        ratio: generation.ratio,
        mediaUrl,
      },
    };
  } catch (error) {
    console.error("Generation error:", error);

    return {
      success: false,
      error: "Something went wrong while generating.",
      fieldErrors: {},
      generation: null,
    };
  }
}
