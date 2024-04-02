"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUI/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-orange"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => {
      row.original.collections.map(collection=>collection.title);
    },
  },
  {
    id: "action",
    cell: ({ row }) => <Delete id={row.original._id} item="products" />,
  },
];
