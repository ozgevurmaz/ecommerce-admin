import { formSchema } from "@/components/products/ProductForm";
import Category from "@/lib/models/categories";
import Collection from "@/lib/models/collections";
import Product from "@/lib/models/products";

import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const body = await req.json();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      colors,
      sizes,
      price,
      expense,
      stock,
      prices,
    } = body;

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return new NextResponse("Product already exists", { status: 400 });
    }

    if (!title || !media || !category || !sizes || !colors || !price || !expense || !stock) {
      return new NextResponse("Not enough info to create product", { status: 400 });
    }

    // Convert prices to Decimal128
    const pricesMap = new Map<string, mongoose.Types.Decimal128>();
    for (const color of colors) {
      for (const size of sizes) {
        const key = `${color}-${size}`;
        const individualPrice = prices[key] ?? price;
        pricesMap.set(key, mongoose.Types.Decimal128.fromString(individualPrice.toString()));
      }
    }

    // Convert stock to a Map
    const stockMap = new Map<string, number>();
    for (const [key, value] of Object.entries(stock)) {
      stockMap.set(key, Number(value));
    }

    // Create the product
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections: Array.isArray(collections) ? collections : [],
      tags,
      colors,
      sizes,
      price: mongoose.Types.Decimal128.fromString(price.toString()),
      expense: mongoose.Types.Decimal128.fromString(expense.toString()),
      stock: stockMap,
      prices: pricesMap,
    });

    // Save to Collections 
    if (collections?.length) {
      await Promise.all(
        collections.map(async (collectionId: string) => {
          const collection = await Collection.findById(collectionId);
          if (collection) {
            collection.products.push(newProduct._id);
            await collection.save();
          }
        })
      );
    }

    // Save to Category
    if (category) {
      const selectedCategory = await Category.findById(category);
      if (selectedCategory) {
        selectedCategory.products.push(newProduct._id);
        await selectedCategory.save();
      }
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("[products_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection })
      .populate({ path: "category", model: Category });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(["products_GET"], error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};