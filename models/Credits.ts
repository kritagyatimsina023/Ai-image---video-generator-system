import mongoose, { Schema, Model } from "mongoose";
export type PlanType = "free" | "starter" | "enterprise";

export interface ICredit {
  userId: mongoose.Types.ObjectId;
  credits: number;

  plan: PlanType;

  planStartedAt?: Date;
  planExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const creditSchema = new Schema<ICredit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    credits: {
      type: Number,
      default: 30,
      min: 0,
    },
    plan: {
      type: String,
      enum: ["free", "starter", "enterprise"],
      default: "free",
    },
    planStartedAt: {
      type: Date,
    },

    planExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
const Credit: Model<ICredit> =
  mongoose.models.Credit || mongoose.model<ICredit>("Credit", creditSchema);
export default Credit;
