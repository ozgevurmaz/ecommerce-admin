"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({row})=>(
      <Link href={`/orders/${row.original._id}`} className="hover:text-red-600">
      {row.original._id}
      </Link>
      ),
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
