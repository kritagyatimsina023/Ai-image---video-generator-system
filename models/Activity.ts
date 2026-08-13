import mongoose, { Schema, Document } from "mongoose";

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type:
    | "USER_REGISTERED"
    | "IMAGE_GENERATED"
    | "VIDEO_GENERATED"
    | "CREDIT_ADDED"
    | "USER_BANNED"
    | "USER_UNBANNED"
    | "PLAN_CHANGED";
  description: string;
  metaData?: {
    amount?: number;
    plan?: string;
  };
  createdAt: Date;
}
const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metaData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);
activitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

export default mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", activitySchema);
