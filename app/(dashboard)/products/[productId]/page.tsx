"use client";

import Loader from "@/components/customUI/Loader";
import ProductForm from "@/components/products/ProductForm";
import { fetchData } from "@/lib/actions/fetchers";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] =
    useState<ProductType | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const data = await fetchData("products", params.productId);
      setProductDetails(data);
      setIsLoading(false);
    };

    getProductDetails();
  }, [params.productId]);

  return isLoading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetails;
