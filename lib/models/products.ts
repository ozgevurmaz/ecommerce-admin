import mongoose from "mongoose";

 export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  collections: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Collection" 
  }],
  tags: [String],
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    get: (v: mongoose.Schema.Types.Decimal128) => {
      return parseFloat(v.toString());
    },
    required: true,
  },
  expense: {
    type: mongoose.Schema.Types.Decimal128,
    get: (v: mongoose.Schema.Types.Decimal128) => {
      return parseFloat(v.toString());
    },
    required: true,
  },
  prices: {
    type: Map,
    of: mongoose.Schema.Types.Decimal128,
    default: {},
    get: (v: Map<string, mongoose.Schema.Types.Decimal128>) => {
      if (!v) return {};
      const result: Record<string, number> = {};
      v.forEach((value, key) => {
        result[key] = parseFloat(value.toString());
      });
      return result;
    }
  },
  stock: {
    type: Map,
    of: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
}, { toJSON: { getters: true } });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);