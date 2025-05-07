"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUI/Delete";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "media",
    header: "Image",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`}>
        <div className="relative w-20 h-20 rounded-md overflow-hidden">
          {row.original.media && row.original.media.length > 0 ? (
            <img
              src={row.original.media[0]}
              alt={row.original.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="font-medium hover:text-orange transition-colors"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-xs">
        {row.original.collections.map((col) => (
          <Badge 
            key={col._id} 
            variant="outline"
            className="hover:bg-orange/10 hover:text-orange transition-colors max-w-max"
          >
            <Link href={`/collections/${col._id}`}>
              {col.title}
            </Link>
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <span className="capitalize">
          {typeof category === "object" && category?.title
            ? category.title
            : "Uncategorized"}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => (
      <span className="font-medium">
        {typeof row.original.price === 'number' 
          ? `$${row.original.price.toFixed(2)}` 
          : row.original.price}
      </span>
    ),
  },
  {
    accessorKey: "expense",
    header: "Cost ($)",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {typeof row.original.expense === 'number' 
          ? `$${row.original.expense.toFixed(2)}` 
          : row.original.expense}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link href={`/products/${row.original._id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4 text-blue-500" />
          </Button>
        </Link>
        <Delete id={row.original._id} item="products" />
      </div>
    ),
  },
];
