import mongoose from "mongoose";

const AppScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    path: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    cover: { type: String, default: "" },
    prices: [
      {
        period: { type: Number, required: true },
        value: { type: Number, required: true },
      },
    ],
    featured: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.App || mongoose.model("App", AppScheme);
