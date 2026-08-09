import Order from "@/models/Order";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

/*
1. Receive product IDs and quantities.
2. Check that each product exists.
3. Check that enough stock is available.
4. Calculate the total.
5. Reduce the product stock.
6. Create the order.
*/
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order must contain at least one item",
        },
        { status: 400 },
      );
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of body.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "Product not found",
          },
          { status: 404 },
        );
      }

      if (!item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Quantity must be greater than 0",
          },
          { status: 400 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Not enough stock for ${product.name}`,
          },
          { status: 400 },
        );
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 },
    );
  }
}
