"use client";

import Loader from "@/components/customUI/Loader";
import ProductForm from "@/components/products/ProductForm";
import React, { useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? <Loader /> : <ProductForm />;
};

export default ProductDetails;
