import { useMutation } from "@tanstack/react-query";
import { GenerateOutput } from "../create.action";

export const useGenerate = () => {
  return useMutation({
    mutationFn: GenerateOutput,
  });
};
