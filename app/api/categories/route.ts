import Category from "@/lib/models/categories";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
      await connectToDB();
  
      const categories = await Category.find().sort({ updatedAt: "desc" });
  
      return NextResponse.json(categories, { status: 200 });
    } catch (error) {
      console.log("[categorie_GET]", error);
      return new NextResponse("internal server error", { status: 500 });
    }
  };

  export const POST = async (req: NextRequest) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unautherized", { status: 403 });
      }
  
      await connectToDB();
  
      const { title, description, image, isActive } = await req.json();
  
      const existingCategory = await Category.findOne({ title });
  
      if (existingCategory) {
        return new NextResponse("Category already exists", { status: 400 });
      }
  
      if (!title || !image) {
        return new NextResponse("Title and image are required", { status: 400 });
      }
  
      const newCategory = await new Category({
        title,
        description,
        image,
        isActive,
        createdAt: new Date(),
        updateAt: new Date(),
      });
  
      await newCategory.save();
  
      return NextResponse.json(newCategory, { status: 200 });
    } catch (error) {
      console.log("[category_POST]", error);
      return new NextResponse("internal server error", { status: 500 });
    }
  };