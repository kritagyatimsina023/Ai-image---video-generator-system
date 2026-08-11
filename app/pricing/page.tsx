import PricingMain from "@/feature/pricing/components/PricingMain";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const PricingPage = async () => {
  const user = await getCurrentUser();
  return <PricingMain user={user} />;
};

export default PricingPage;
