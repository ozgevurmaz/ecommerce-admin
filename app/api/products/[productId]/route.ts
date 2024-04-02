import Collection from "@/lib/models/collections";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unautherized", { status: 401 });
    }

    await connectToDB();

    let product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse("Product not found", {
        status: 404,
      });
    }

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
      return new NextResponse(
        "Title, description, media, category, price, expense are required",
        {
          status: 400,
        }
      );
    }

    if (collections.length > 3) {
      return new NextResponse("Too much collection selected", {
        status: 400,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes, 
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("[productId_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const userId = auth();
    if (!userId) {
      return new NextResponse("Unautherized", { status: 401 });
    }

    await connectToDB();

    await Product.findByIdAndDelete(params.productId);
    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("[products_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
