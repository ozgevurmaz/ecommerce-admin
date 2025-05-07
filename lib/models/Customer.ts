import mongoose from "mongoose";

export const customerSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  email: String,
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);