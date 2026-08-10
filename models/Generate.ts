import mongoose, { Schema, Model } from "mongoose";

export interface IGenerate {
  userId: mongoose.Types.ObjectId;
  prompt: string;
  model: string;
  type: "image" | "video";
  mediaUrl: string;
  ratio: string;
  createdAt: Date;
  updatedAt: Date;
}

const generateSchema = new Schema<IGenerate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    ratio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Generate: Model<IGenerate> =
  mongoose.models.Generate ||
  mongoose.model<IGenerate>("Generate", generateSchema);

export default Generate;
