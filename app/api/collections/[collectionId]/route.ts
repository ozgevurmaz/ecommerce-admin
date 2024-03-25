import Collection from "@/lib/models/collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collection_GET]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", {
        status: 404,
      });
    }
    const { title, description, image } = await req.json();
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );
    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collection_POST]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};

export const DELETE = async (
  red: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unautherized", { status: 401 });
    }

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[collectionId_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
