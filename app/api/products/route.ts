import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, description, price, stock, category, status } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, description, and category are required",
        },
        { status: 400 },
      );
    }

    if (price === undefined || typeof price !== "number" || price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Price must be a valid number",
        },
        { status: 400 },
      );
    }

    if (stock === undefined || typeof stock !== "number" || stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Stock must be a valid number",
        },
        { status: 400 },
      );
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      status: status || "ACTIVE",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 },
    );
  }
}
