import { create } from "zustand";

export type GenerationType = "image" | "video";
export type AIModel = "GPT" | "Gemini" | "Claude";
export type AspectRatio = "16:9" | "1:1" | "9:16" | "4:3";

interface CreateState {
  prompt: string;
  type: GenerationType;
  model: AIModel;
  ratio: AspectRatio;
  video: string;

  setPrompt: (prompt: string) => void;
  setType: (type: GenerationType) => void;
  setModel: (model: AIModel) => void;
  setRatio: (ratio: AspectRatio) => void;
  setVideo: (video: string) => void;

  setGenerationData: (data: {
    prompt: string;
    type: GenerationType;
    model: AIModel;
    ratio: AspectRatio;
  }) => void;

  reset: () => void;
}

const initialState = {
  prompt: "",
  type: "image" as GenerationType,
  model: "GPT" as AIModel,
  ratio: "16:9" as AspectRatio,
  video: "",
};

export const useCreateStore = create<CreateState>((set) => ({
  ...initialState,
  setPrompt: (prompt) => set({ prompt }),
  setType: (type) => set({ type }),
  setModel: (model) => set({ model }),
  setRatio: (ratio) => set({ ratio }),
  setVideo: (video) => set({ video }),
  setGenerationData: (data) =>
    set({
      prompt: data.prompt,
      type: data.type,
      model: data.model,
      ratio: data.ratio,
    }),

  reset: () => set(initialState),
}));
