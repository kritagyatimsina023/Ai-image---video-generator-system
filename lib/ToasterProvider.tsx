"use client";

import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
  WarningRounded,
} from "@mui/icons-material";
import { Toaster as SonnerToaster } from "sonner";

const ToastProvider = () => {
  return (
    <SonnerToaster
      position="top-right"
      duration={3500}
      closeButton
      richColors={false}
      icons={{
        success: <CheckCircleRounded />,
        error: <ErrorRounded />,
        info: <InfoRounded />,
        warning: <WarningRounded />,
      }}
      toastOptions={{
        className: "ai-toast",
        style: {
          background: "rgba(4, 9, 18, 0.92)",
          color: "#fff",
          border: "1px solid rgba(59, 130, 246, 0.22)",
          borderRadius: "14px",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(37, 99, 235, 0.08)",
          padding: "14px 16px",
        },

        classNames: {
          title: "ai-toast-title",
          description: "ai-toast-description",
          closeButton: "ai-toast-close",
        },
      }}
    />
  );
};

export default ToastProvider;
