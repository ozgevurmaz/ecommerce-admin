"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUI/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "media",
    header: " ",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} key={row.original._id}>
        <img
          src={row.original.media[0]}
          width={300}
          height={300}
          className="w-20 h-20 object-cover"
        />{" "}
      </Link>
    ),
  },
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
];
