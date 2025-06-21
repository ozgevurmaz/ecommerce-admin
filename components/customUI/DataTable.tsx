"use client";

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
<<<<<<< HEAD
  getCoreRowModel,  getPaginationRowModel,
=======
  getCoreRowModel, getPaginationRowModel,
>>>>>>> 9029510 (fixed things)
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
<<<<<<< HEAD
    getFilteredRowModel: getFilteredRowModel(),getPaginationRowModel: getPaginationRowModel(),
=======
    getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(),
>>>>>>> 9029510 (fixed things)
    state: { columnFilters },
  });

  return (
    <div className="p-12">
      <Input
        placeholder="Search..."
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(searchKey)?.setFilterValue(event.target.value)
        }
<<<<<<< HEAD
        className="max-w-sm mb-3"
      />
      <div className="rounded-md border">
        <Table>
=======
        className="max-w-sm mb-3 bg-input border border-border"
      />
      <div className="rounded-md border border-border overflow-hidden">
        <Table className="bg-card">
>>>>>>> 9029510 (fixed things)
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
<<<<<<< HEAD
                            header.column.columnDef.header,
                            header.getContext()
                          )}
=======
                          header.column.columnDef.header,
                          header.getContext()
                        )}
>>>>>>> 9029510 (fixed things)
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
<<<<<<< HEAD
      
      <div className="flexEnd space-x-2 py-4">
        <Button
          variant="outline"
=======

      <div className="flexEnd space-x-2 py-4">
        <Button
          variant="secondary"
>>>>>>> 9029510 (fixed things)
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
<<<<<<< HEAD
          variant="outline"
=======
          variant="secondary"
>>>>>>> 9029510 (fixed things)
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>
  );
}
