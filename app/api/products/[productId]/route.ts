import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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
    console.error(error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
