"use client";

import React, { useEffect, useState } from "react";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { columns } from "@/components/collections/CollectionColumns";

import { DataTable } from "@/components/customUI/DataTable";
import Loader from "@/components/customUI/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchData } from "@/lib/actions/fetchers";
<<<<<<< HEAD
=======
import PageHeader from "@/components/customUI/PageHeader";
>>>>>>> 9029510 (fixed things)

const Collections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter();
<<<<<<< HEAD
  const getCollections = async () => { 
      const data = await fetchData("collections")
      setCollections(data);
      setIsLoading(false);
=======
  const getCollections = async () => {
    const data = await fetchData("collections")
    setCollections(data);
    setIsLoading(false);
>>>>>>> 9029510 (fixed things)
  };

  useEffect(() => {
    getCollections();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
<<<<<<< HEAD
    <div className="p-10">
      <div className="flexBetween max-md:flex-col">
        <h2 className="text-heading2-bold">Collections</h2>
        <Button
          className="text-white bg-orange"
=======
    <div>
      <div className="flexBetween max-md:flex-col">
         <PageHeader title="Collections" />
        <Button
>>>>>>> 9029510 (fixed things)
          onClick={() => router.push("/collections/new")}
        >
          <PlusCircle className="mr-2" />
          Create Collection
        </Button>
      </div>
<<<<<<< HEAD
      <Separator className="my-4 bg-grey mt-4" />
=======
      <Separator className="my-4 bg-border mt-4" />
>>>>>>> 9029510 (fixed things)

      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
