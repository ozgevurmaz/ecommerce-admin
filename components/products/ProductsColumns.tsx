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
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
    row.original.collections
      .map((col) => (
        <Link
          href={`/collections/${col._id}`}
          className="hover:text-orange mr-1"
          key={col._id}
        >
          {col.title.split(" ")[0]}
        </Link>
      )) ,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Prices ($)",
  },
  {
    accessorKey: "expense",
    header: "Costs ($)",
  },
  {
    id: "action",
    cell: ({ row }) => <Delete id={row.original._id} item="products" />,
  },
];
