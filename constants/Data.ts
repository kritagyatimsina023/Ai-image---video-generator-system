import { Plan } from "@/feature/pricing/pricing.type";

export const getNavbarData = (role: "user" | "admin") => [
  {
    label: "Home",
    href: "/",
  },
  {
    label: role === "admin" ? "Dashboard" : "Create",
    href: role === "admin" ? "/dashboard" : "/create",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export const plans: Plan[] = [
  {
    name: "Starter Plan",
    description:
      "Perfect for beginners exploring AI-powered image and video generation.",
    monthlyPrice: 18,
    yearlyPrice: 162,
    accent: "blue",

    imageCredits: "3 Image Credits / Month",
    videoCredits: "2 Video Credits / Month",

    limits: [
      "1 User",
      "3 Image Credits / Month",
      "2 Video Credits / Month",
      "Standard generation speed",
    ],

    features: [
      "AI Image Generation",
      "AI Video Generation",
      "Multiple Aspect Ratios",
      "GPT, Gemini & Claude",
      "Generation History",
      "Download Generated Media",
      "Email Support",
    ],

    buttonText: "Get Started",
  },

  {
    name: "Creator Plan",
    description:
      "For creators and small teams that need more credits and greater flexibility.",
    monthlyPrice: 64,
    yearlyPrice: 576,
    accent: "purple",
    popular: true,

    imageCredits: "15 Image Credits / Month",
    videoCredits: "10 Video Credits / Month",

    limits: [
      "1 User",
      "15 Image Credits / Month",
      "10 Video Credits / Month",
      "Priority generation speed",
    ],

    features: [
      "Everything in Starter",
      "Premium AI Models",
      "Higher Generation Limits",
      "Priority Processing",
      "Generation History",
      "HD Image Generation",
      "HD Video Generation",
      "No Watermark",
      "Priority Support",
    ],

    buttonText: "Upgrade",
  },

  {
    name: "Enterprise Plan",
    description:
      "For teams and businesses creating AI content at scale with maximum flexibility.",
    monthlyPrice: 112,
    yearlyPrice: 1008,
    accent: "cyan",

    imageCredits: "Unlimited Image Credits",
    videoCredits: "Unlimited Video Credits",

    limits: [
      "Unlimited Users",
      "Unlimited Image Generation",
      "Unlimited Video Generation",
      "Maximum generation priority",
    ],

    features: [
      "Everything in Creator",
      "Unlimited Image Credits",
      "Unlimited Video Credits",
      "Advanced AI Models",
      "API Access",
      "Team Workspace",
      "Commercial Usage",
      "Dedicated Support",
      "Custom Integration",
    ],

    buttonText: "Contact Sales",
  },
];
