import { useEffect } from "react";
import { GenerateActionState } from "../generate.types";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAutoScroll = (
  containerRef: React.RefObject<HTMLElement | null>,
  dependency: number,
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || dependency === 0) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [dependency, containerRef]);
};

export const useGenerationState = (state: GenerateActionState) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error, {
        action: {
          label: "Buy Credits",
          onClick: () => router.push("/pricing"),
        },
      });
      return;
    }
    const errors = Object.values(state.fieldErrors ?? {})
      .flat()
      .filter(Boolean);

    if (errors.length > 0) {
      toast.error(errors.join(" • "));
    }

    if (state.success && state.generation) {
      queryClient.invalidateQueries({
        queryKey: ["credits"],
      });
    }
  }, [state, router, queryClient]);
};
