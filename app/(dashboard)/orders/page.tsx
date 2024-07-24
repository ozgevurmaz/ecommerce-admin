"use client";

import { DataTable } from "@/components/customUI/DataTable";
import { columns } from "@/components/orders/OrdersColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState<OrderType[]>([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", { method: "GET" });
      const data = await res.json();
      setOrderDetails(data);
    } catch (err) {
      console.log("[ORDER_GET]", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-heading2-bold">Orders</h2>
      <Separator className="my-4 bg-grey mt-4" />

      <DataTable data={orderDetails} columns={columns} searchKey="customer" />
    </div>
  );
};

export default Orders;
