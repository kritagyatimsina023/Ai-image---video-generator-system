import mongoose, { Schema, Model } from "mongoose";
export interface ICredit {
  userId: mongoose.Types.ObjectId;

  // imageCredits: number;
  // videoCredits: number;
  credits: number;
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

    // imageCredits: {
    //   type: Number,
    //   default: 3,
    //   min: 0,
    // },

    // videoCredits: {
    //   type: Number,
    //   default: 2,
    //   min: 0,
    // },
  },
  {
    timestamps: true,
  },
);
const Credit: Model<ICredit> =
  mongoose.models.Credit || mongoose.model<ICredit>("Credit", creditSchema);
export default Credit;
