import { GenerateResponse, GenerateTypes } from "./../../types/global.types";
export const GenerateOutput = async ({
  prompt,
  model,
  ratio,
  type,
}: GenerateTypes) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
  return {
    prompt,
    model,
    ratio,
    urlLinks:
      type === "video"
        ? "https://res.cloudinary.com/dohtpxlnd/video/upload/v1781059463/Screen_Recording_2026-06-10_at_08.20.25_1_fvp4f6.mp4"
        : "https://avatars.githubusercontent.com/u/97165289",
  };
};
