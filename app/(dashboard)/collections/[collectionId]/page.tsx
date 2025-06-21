"use client";

import React, { useEffect, useState } from "react";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/customUI/Loader";
import { DataTable } from "@/components/customUI/DataTable";
import { columns } from "@/components/collections/productColumns";
import { fetchData } from "@/lib/actions/fetchers";
<<<<<<< HEAD
=======
import PageHeader from "@/components/customUI/PageHeader";
import { Separator } from "@/components/ui/separator";
>>>>>>> 9029510 (fixed things)

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    const data = await fetchData("collections", params.collectionId)
    setCollectionDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
<<<<<<< HEAD
    <div>
      <CollectionForm initialData={collectionDetails} />
      {collectionDetails && (
        <div className="px-10">
          <h3 className="text-heading3-bold">Products</h3>
=======
    <div className="space-y-6">
      <CollectionForm initialData={collectionDetails} />
      {collectionDetails && (
        <div>
          <Separator className="my-8"/>
          <h3 className="text-xl md:text-2xl lg:text-3xl">Related Products </h3>
>>>>>>> 9029510 (fixed things)
          <DataTable
            columns={columns}
            data={collectionDetails.products}
            searchKey="title"
          />
        </div>
      )}
    </div>
  );
};

export default CollectionDetails;
export const dynamic = "force-dynamic";
