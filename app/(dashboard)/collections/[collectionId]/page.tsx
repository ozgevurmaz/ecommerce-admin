"use client";

import React, { useEffect, useState } from "react";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/customUI/Loader";
import { DataTable } from "@/components/customUI/DataTable";
import { columns } from "@/components/collections/productColumns";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });

      const data = await res.json();
      setCollectionDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[collectionId_GET]", error);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <CollectionForm initialData={collectionDetails} />
      {collectionDetails && (
        <div className="px-10">
          <h3 className="text-heading3-bold">Products</h3>
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
