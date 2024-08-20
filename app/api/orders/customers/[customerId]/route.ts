import Order from "@/lib/models/Order";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectToDB();

    const order = await Order.find({ customerClerkId: params.customerId }).populate({
      path: "products.product",
      model: Product,
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("[GET_USER_ORDERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
