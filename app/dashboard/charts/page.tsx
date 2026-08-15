import ChartMainPage from "@/feature/charts/components/ChartMainPage";

type chartHomeProps = {
  searchParams: Promise<{
    range?: string;
  }>;
};

const ChartHome = ({ searchParams }: chartHomeProps) => {
  return (
    <>
      <ChartMainPage searchParams={searchParams} />
    </>
  );
};

export default ChartHome;
