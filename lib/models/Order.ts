import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    streetNumber: String,
    streetName: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  shippingRate: String,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);