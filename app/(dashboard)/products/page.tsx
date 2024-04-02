"use client";

import React, { useEffect, useState } from "react";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { columns } from "@/components/products/ProductsColumns";

import { DataTable } from "@/components/customUI/DataTable";
import Loader from "@/components/customUI/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[products_GET]", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="p-10">
      <div className="flexBetween">
        <h2 className="text-heading2-bold">Products</h2>
        <Button
          className="text-white bg-orange"
          onClick={() => router.push("/collections/new")}
        >
          <PlusCircle className="mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="my-4 bg-grey mt-4" />

      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
