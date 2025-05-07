import Category from "@/lib/models/categories";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
    try {
        await connectToDB();

        const category = await Category.findById(params.categoryId).populate("products");

        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found" }),
                { status: 404 }
            );
        }
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[categoryId_GET]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export const PUT = async (
    req: NextRequest,
    { params }: { params: { categoryId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }
        await connectToDB();

        let category = await Category.findById(params.categoryId);
        
        if (!category) {
            return new NextResponse("Category not found", {
                status: 404,
            });
        }
        const { title, description, image, isActive } = await req.json();
        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
        }

        category = await Category.findByIdAndUpdate(
            params.categoryId,
            { title, description, image, isActive },
            { new: true }
        );

        await category.save();
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[category_PUT]", error);
        return new NextResponse("internal server error", { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { categoryId: string } }
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unautherized", { status: 401 });
        }

        await connectToDB();

        await Category.findByIdAndDelete(params.categoryId);

        await Product.updateMany(
            { categories: params.categoryId },
            { $pull: { categories: params.categoryId } }
        );

        return new NextResponse("Category is deleted", { status: 200 });
    } catch (error) {
        console.log("[CategoryId_DELETE]", error);
        return new NextResponse("internal server error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
