import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
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
  stock: {
    type:[String],
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
}, {toJSON : {getters: true}});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;