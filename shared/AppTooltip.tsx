"use client";

import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

const AppTooltip = ({ children, title, ...props }: TooltipProps) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement="top"
      {...props}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "rgba(4, 9, 18, 0.96)",
            color: "#dbeafe",

            fontSize: 12,
            fontWeight: 500,

            px: 1.5,
            py: 1,

            borderRadius: 1.5,

            border: "1px solid rgba(59, 130, 246, 0.25)",

            boxShadow:
              "0 10px 35px rgba(0, 0, 0, 0.45), 0 0 20px rgba(37, 99, 235, 0.08)",

            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          },
        },

        arrow: {
          sx: {
            color: "rgba(4, 9, 18, 0.96)",
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default AppTooltip;
