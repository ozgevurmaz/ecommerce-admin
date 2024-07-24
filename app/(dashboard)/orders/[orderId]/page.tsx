import { DataTable } from "@/components/customUI/DataTable";
import { columns } from "@/components/orders/OrderItemColumns";
import { Separator } from "@/components/ui/separator";
import React from "react";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {

  const res = await fetch(`${process.env.ECOMMERCE_ADMIN}/orders/${params.orderId}`);
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="p-10">
      <h2 className="text-heading2-bold">OrderDetails</h2>
      <Separator className="my-4 bg-grey mt-4" />
      <p className="text-base-bold">
        Order Id: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer Name:{" "}
        <span className="text-base-medium"> {customer.name} </span>
      </p>
      <p className="text-base-bold">
        Shipping Address:{" "}
        <span className="text-base-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">{orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping Rate ID{" "}
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>

      <DataTable columns={columns} data={orderDetails.products} searchKey="product"/>
    </div>
  );
};

export default OrderDetails;
