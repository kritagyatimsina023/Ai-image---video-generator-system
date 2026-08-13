import { CreditCardRounded, AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

const CreditPageHeader = () => {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      sx={{
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        mb: 4,
      }}
    >
      {/* Title */}
      <Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              background: "rgba(37,99,235,.1)",
              border: "1px solid rgba(59,130,246,.18)",
            }}
          >
            <CreditCardRounded
              sx={{
                fontSize: 21,
                color: "#60a5fa",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              letterSpacing: "-.03em",
            }}
          >
            Credits
          </Typography>
        </Stack>

        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
            color: "rgba(255,255,255,.45)",
          }}
        >
          Manage user credits, plans, and subscription status.
        </Typography>
      </Box>

      {/* Right side */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: {
            xs: 2,
            sm: 0,
          },
          alignItems: "center",
        }}
      >
        <AutoAwesomeRounded
          sx={{
            fontSize: 18,
            color: "#60a5fa",
          }}
        />

        <Typography
          sx={{
            fontSize: 13,
            color: "rgba(255,255,255,.5)",
          }}
        >
          Credit Management
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CreditPageHeader;
