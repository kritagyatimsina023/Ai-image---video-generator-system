"use server";

import { z } from "zod";

import { generateSchema } from "@/schema/Global.schema";
import Generate from "@/models/Generate";
import { connectDB } from "@/lib/Mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { GenerateActionState } from "./generate.types";
import { revalidatePath } from "next/cache";

const DUMMY_IMAGE_URL =
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455";

const DUMMY_VIDEO_URL =
  "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";

export async function generateAction(
  prevState: GenerateActionState,
  formData: FormData,
): Promise<GenerateActionState> {
  try {
    // 1. Authenticate
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        error: "You must be logged in",
        fieldErrors: {},
        generation: null,
      };
    }

    // 2. Extract form data
    const rawData = {
      prompt: formData.get("prompt"),
      type: formData.get("type"),
      model: formData.get("model"),
      ratio: formData.get("ratio"),
    };
    console.log(rawData);

    // 3. Validate
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

    // 4. Connect DB
    await connectDB();

    // 5. Dummy generation
    const mediaUrl = type === "video" ? DUMMY_VIDEO_URL : DUMMY_IMAGE_URL;

    // 6. Save generation
    const generation = await Generate.create({
      userId: user.userId,
      prompt,
      model,
      type,
      ratio,
      mediaUrl: type === "image" ? DUMMY_IMAGE_URL : DUMMY_VIDEO_URL,
    });
    await new Promise((resolve) => setTimeout(resolve, 4000));
    revalidatePath("/create");

    // 7. Return serializable data
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
