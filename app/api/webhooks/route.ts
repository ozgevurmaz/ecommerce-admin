import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false, 
  },
};
console.log("Hi")
export const POST = async (req: NextRequest) => {
  console.log("Hiiii")
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };

      const shippingAddress = {
        streetNumber: session?.customer_details?.address?.line1,
        streetName: session?.customer_details?.address?.line2,
        city: session?.customer_details?.address?.city,
        state: session?.customer_details?.address?.state,
        postalCode: session?.customer_details?.address?.postal_code,
        country: session?.customer_details?.address?.country,
      };

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items.data.price.product"],
        }
      );

      const lineItem = await retrieveSession?.line_items?.data;

      const orderItems = lineItem?.map((item: any) => {
        return {
          product: item.price.metadata.productId,
          color: item.price.metadata.color || "N/A",
          size: item.price.metadata.size || "N/A",
          quantity: item.quantity,
        };
      });

      await connectToDB();
      console.log("DB connected")

      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      });

      await newOrder.save();
console.log("Order saved")
      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

      if (customer) {
        customer.orders.push(newOrder._id);
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        });
      }
      await customer.save();
      console.log("Customer saved")
    }
    
    return new NextResponse("Order created successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[WEBHOOKs_POST]", error);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
