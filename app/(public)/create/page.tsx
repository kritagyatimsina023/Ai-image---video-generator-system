import CreateData from "@/feature/create/components/CreateData";
import CreateHomeSkeleton from "@/feature/create/components/CreateHomeSkeleton";
import { Suspense } from "react";

const CreateMain = async () => {
  return (
    <Suspense fallback={<CreateHomeSkeleton />}>
      <CreateData />
    </Suspense>
  );
};

export default CreateMain;
