import mongoose from "mongoose";

const OrderScheme = new mongoose.Schema(
  {
    orderNo: { type: String, required: true },
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    price: {
      period: { type: Number, required: true },
      value: { type: Number, required: true },
    },
    expDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderScheme);
