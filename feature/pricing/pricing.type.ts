export type BillingPeriod = "monthly" | "yearly";

export type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  accent: "blue" | "purple" | "cyan";
  popular?: boolean;
  imageCredits: string;
  videoCredits: string;
  limits: string[];
  features: string[];
  buttonText: string;
};
