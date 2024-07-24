import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const corHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();
 
    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", {
        status: 400,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["DE", "FR"],
      },
      shipping_options: [
        { shipping_rate: "shr_1PfJpVLVCXGlurQzxMjOO3xK" },
        { shipping_rate: "shr_1PfJq0LVCXGlurQzeGx8JkHs" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              size: cartItem.size,
              color: cartItem.color,
            },
          },
          unit_amount: Math.round(cartItem.item.price*100),
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE}/cart`,
    });

    return NextResponse.json(session, { headers: corHeaders });
  } catch (err) {
    console.error("[CHECKOUT_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
