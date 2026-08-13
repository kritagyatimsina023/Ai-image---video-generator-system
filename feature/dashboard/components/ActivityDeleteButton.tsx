"use client";
import { Button } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteActivity } from "../actions/Dashboard.action";

const ActivityDeleteButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteActivity();
        if (result.success) {
          toast.success("All activities removed");
          router.refresh();
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove activities");
      }
    });
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      variant="outlined"
      startIcon={<Trash2 size={16} />}
      sx={{
        minWidth: "auto",
        px: 1.5,
        py: 0.8,
        borderRadius: 2,
        textTransform: "none",
        fontSize: 12,
        fontWeight: 600,
        color: "#fca5a5",
        borderColor: "rgba(239,68,68,.2)",
        background: "rgba(239,68,68,.04)",

        "&:hover": {
          color: "#f87171",
          borderColor: "rgba(239,68,68,.35)",
          background: "rgba(239,68,68,.08)",
        },
      }}
    >
      {isPending ? "Removing..." : "Remove all events"}
    </Button>
  );
};

export default ActivityDeleteButton;
