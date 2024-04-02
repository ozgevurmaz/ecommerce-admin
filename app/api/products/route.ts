import Collection from "@/lib/models/collections";
import Product from "@/lib/models/products";

import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unautherized", { status: 401 });
    }

    await connectToDB();

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
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    
    if (collections.length > 3) {
      return new NextResponse("Too much collection selected", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
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
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(["products_GET"], error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
