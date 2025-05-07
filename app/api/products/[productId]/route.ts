import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/products";
import Collection from "@/lib/models/collections";
import Category from "@/lib/models/categories";

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDB();

    const product = await Product.findById(params.productId);
    if (!product) return new NextResponse("Product not found", { status: 404 });

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

    if (!title || !description || !media || !category || !price || !expense || !stock) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (collections.length > 3) {
      return new NextResponse("Too many collections selected", { status: 400 });
    }

    // Update collections
    const currentCollections = product.collections.map((c: any) => c.toString());
    const added = collections.filter((id: string) => !currentCollections.includes(id));
    const removed = currentCollections.filter((id: string) => !collections.includes(id));

    await Promise.all([
      added.map((id: string) =>
        Collection.findByIdAndUpdate(id, { $push: { products: product._id } })
      ),
      removed.map((id: string) =>
        Collection.findByIdAndUpdate(id, { $pull: { products: product._id } })
      ),
    ]);
    
    // Update category
    if (category !== product.category) {
      const removedCategory = product.category;

      await Category.findByIdAndUpdate(category, { $push: { products: product._id } });
      await Category.findByIdAndUpdate(removedCategory, { $pull: { products: product._id } });
    }


    const formattedPrices: Record<string, mongoose.Types.Decimal128> = {};
    for (const [key, val] of Object.entries(prices)) {
      formattedPrices[key] = mongoose.Types.Decimal128.fromString((val as number).toString());
    }

    const formattedStock: Record<string, number> = {};
    for (const [key, val] of Object.entries(stock)) {
      formattedStock[key] = Number(val);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.productId,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        colors: colors.length ? colors : ["std"],
        sizes: sizes.length ? sizes : ["std"],
        price,
        expense,
        stock: formattedStock,
        prices: formattedPrices,
      },
      { new: true }
    ).populate("collections");

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("[products_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate("collections");
    if (!product) return new NextResponse("Product not found", { status: 404 });

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ECOMMERCE_STORE_URL || "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("[product_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDB();

    const product = await Product.findById(params.productId);
    if (!product) return new NextResponse("Product not found", { status: 404 });

    await Product.findByIdAndDelete(params.productId);

    await Promise.all(
      product.collections.map((c: string) =>
        Collection.findByIdAndUpdate(c, { $pull: { products: product._id } })
      ),
    );

    Category.findByIdAndUpdate(product.category, { $pull: { products: product._id } })

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("[product_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
