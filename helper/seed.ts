import mongoose from "mongoose";
import User from "@/models/User";
import Generate from "@/models/Generate";
import Credit from "@/models/Credits";
import { connectDB } from "@/lib/Mongodb";

async function deleteUser(userId: string) {
  await connectDB();

  const user = await User.findById(userId);

  if (!user) {
    console.log("User not found");
    return;
  }

  // Delete all generated media records
  await Generate.deleteMany({
    userId: user._id,
  });

  // Delete user's credit account
  await Credit.deleteOne({
    userId: user._id,
  });

  // Finally delete the user
  await User.deleteOne({
    _id: user._id,
  });

  console.log(`Deleted user: ${user.email}`);
  console.log("Deleted generations and credits");
}

deleteUser("USER_ID_HERE")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
