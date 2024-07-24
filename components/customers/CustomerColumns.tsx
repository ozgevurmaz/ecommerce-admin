"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/customers/${row.original.clerkId}`}
          className="hover:text-red-1"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];