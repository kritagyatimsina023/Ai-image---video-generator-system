import CreateHome from "@/feature/create/components/CreateHome";
import { Generation } from "@/feature/create/generate.types";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Generate from "@/models/Generate";
const CreateMain = async () => {
  const user = await getCurrentUser();

  const promptData = user
    ? await Generate.find({
        userId: user.userId,
      })
        .sort({ createdAt: 1 })
        .lean()
    : [];
  const generations: Generation[] = promptData.map((item) => ({
    id: item._id.toString(),
    userId: item.userId.toString(),
    prompt: item.prompt,
    model: item.model,
    type: item.type,
    mediaUrl: item.mediaUrl,
    ratio: item.ratio as Generation["ratio"],
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
  return (
    <>
      <CreateHome promptData={generations} />
    </>
  );
};

export default CreateMain;
