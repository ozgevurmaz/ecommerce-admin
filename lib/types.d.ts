type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: CategoryType;
  collections: CollectionType[];
  tags: string[];
  sizes: string[];
  colors: string[];
  expense: number;
  price: number;
  prices: Record<string, number>;
  stock: Record<string, number>;
};

type OrderType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
}

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
}

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
}

type ProductSalesType = {
  id: string;
  title: string;
  sales: number;
  quantity: number;
  category: string;
  image: string[];
};

type CategoryType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  products: string[];
  createdAt: string;
  updatedAt: string;
};