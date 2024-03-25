"use client";

import React, { useEffect, useState } from "react";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { columns } from "@/components/collections/CollectionColumns";

import { DataTable } from "@/components/customUI/DataTable";
import Loader from "@/components/customUI/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[collections_GET]", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="p-10">
      <div className="flexBetween">
        <h2 className="text-heading2-bold">Collections</h2>
        <Button
          className="text-white bg-orange"
          onClick={() => router.push("/collections/new")}
        >
          <PlusCircle className="mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="my-4 bg-grey mt-4" />

      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
