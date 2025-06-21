"use client";

import { DataTable } from "@/components/customUI/DataTable";
import Loader from "@/components/customUI/Loader";
import PageHeader from "@/components/customUI/PageHeader";
import { columns } from "@/components/orders/OrdersColumns";
import { Separator } from "@/components/ui/separator";
import { fetchData } from "@/lib/actions/fetchers";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchData("orders");
      setOrderDetails(data)
      setLoading(false)
    };

    getOrders()
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <PageHeader title="Orders" />
      <Separator className="my-4 bg-border mt-4" />

      <DataTable data={orderDetails} columns={columns} searchKey="customer" />
    </div>
  );
};

export default Orders;
