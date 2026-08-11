import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FeatureItem } from "./FeatureItem";
import { CreditBox } from "./CreditBox";
import { ImageRounded, MovieCreationRounded } from "@mui/icons-material";
import { Plan } from "../pricing.type";
import { JwtPayload } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  plan: Plan;
  yearly: boolean;
  user: JwtPayload | null;
}
export const PricingCard = ({ plan, yearly, user }: PricingCardProps) => {
  const router = useRouter();
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  const handlePayment = () => {
    if (!user) return router.push("/login");
  };

  const accent =
    plan.accent === "blue"
      ? "#1688ff"
      : plan.accent === "purple"
        ? "#c026d3"
        : "#14b8a6";

  const accentSecondary =
    plan.accent === "blue"
      ? "#2563eb"
      : plan.accent === "purple"
        ? "#7c3aed"
        : "#0e7490";

  const glow =
    plan.accent === "blue"
      ? "rgba(37,99,235,.15)"
      : plan.accent === "purple"
        ? "rgba(192,38,211,.18)"
        : "rgba(20,184,166,.14)";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: 700,

        borderRadius: 4,
        overflow: "hidden",

        border: `1px solid ${plan.popular ? accent : "rgba(255,255,255,.12)"}`,

        bgcolor: "rgba(4,9,18,.88)",

        boxShadow: plan.popular
          ? `0 0 50px ${glow}, inset 0 0 50px ${glow}`
          : `0 20px 60px rgba(0,0,0,.25)`,

        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: accent,
          boxShadow: `0 20px 70px ${glow}`,
        },
      }}
    >
      {/* Top gradient decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 115,
          background: `radial-gradient(
            ellipse at 50% -20%,
            ${glow},
            transparent 70%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Popular badge */}
      {plan.popular && (
        <Box
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            px: 1.5,
            py: 0.6,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${accent}, ${accentSecondary})`,
            boxShadow: `0 5px 25px ${glow}`,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            ⚡ Most Popular
          </Typography>
        </Box>
      )}

      <Stack
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 2.5, md: 3 },
          height: "100%",
          flex: 1,
        }}
      >
        {/* Plan name */}
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 22, md: 25 },
            fontWeight: 700,
            letterSpacing: "-.02em",
            pr: plan.popular ? 12 : 0,
          }}
        >
          {plan.name}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            mt: 1,
            minHeight: 48,
            color: "rgba(255,255,255,.48)",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {plan.description}
        </Typography>

        {/* Price */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 3, alignItems: "baseline" }}
        >
          <Typography
            sx={{
              fontSize: { xs: 42, md: 48 },
              fontWeight: 400,
              letterSpacing: "-.04em",
            }}
          >
            ${price}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.45)",
              fontSize: 13,
            }}
          >
            / {yearly ? "year" : "month"}
          </Typography>
        </Stack>

        {yearly && (
          <Typography
            sx={{
              color: "#60a5fa",
              fontSize: 11,
              mt: 0.5,
            }}
          >
            Billed annually
          </Typography>
        )}

        {/* CTA */}
        <Button
          onClick={handlePayment}
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            height: 48,
            borderRadius: 2.5,
            textTransform: "none",
            fontSize: 14,
            fontWeight: 700,

            background: plan.popular
              ? `linear-gradient(135deg, ${accentSecondary}, ${accent})`
              : "transparent",

            border: `1px solid ${accent}`,

            boxShadow: plan.popular ? `0 10px 30px ${glow}` : "none",

            "&:hover": {
              background: `linear-gradient(135deg, ${accentSecondary}, ${accent})`,
              boxShadow: `0 10px 35px ${glow}`,
            },
          }}
        >
          {plan.buttonText}
        </Button>

        {/* Divider */}
        <Divider
          sx={{
            my: 3,
            borderColor: "rgba(255,255,255,.09)",
          }}
        />

        {/* Limits */}
        <Typography
          sx={{
            color: accent,
            fontSize: 14,
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          Plan Limits
        </Typography>

        <Stack spacing={1.1}>
          {plan.limits.map((limit) => (
            <FeatureItem key={limit} text={limit} accent={accent} />
          ))}
        </Stack>

        {/* Credits */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            mt: 2,
          }}
        >
          <CreditBox
            icon={<ImageRounded />}
            text={plan.imageCredits}
            accent={accent}
          />

          <CreditBox
            icon={<MovieCreationRounded />}
            text={plan.videoCredits}
            accent={accent}
          />
        </Box>

        <Divider
          sx={{
            my: 3,
            borderColor: "rgba(255,255,255,.09)",
          }}
        />

        {/* Features */}
        <Typography
          sx={{
            color: accent,
            fontSize: 14,
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          Features
        </Typography>

        <Stack spacing={1.15}>
          {plan.features.map((feature) => (
            <FeatureItem key={feature} text={feature} accent={accent} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
