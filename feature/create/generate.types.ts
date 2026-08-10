export type GenerateActionState = {
  success: boolean;
  error: string;
  fieldErrors: {
    prompt?: string[];
    type?: string[];
    model?: string[];
    ratio?: string[];
  };
  generation: {
    id: string;
    prompt: string;
    model: string;
    type: "image" | "video";
    ratio: string;
    mediaUrl?: string;
  } | null;
};
export const initialGenerateState: GenerateActionState = {
  success: false,
  error: "",
  fieldErrors: {},
  generation: null,
};
export type Generation = {
  id: string;
  userId: string;
  prompt: string;
  model: string;
  type: "image" | "video";
  mediaUrl: string;
  ratio: "16:9" | "1:1" | "9:16" | "4:3";
  createdAt: string;
  updatedAt: string;
};
