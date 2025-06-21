"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import toast from "react-hot-toast";
import Delete from "../customUI/Delete";
import MultiText from "../customUI/MultiText";
import MultiSelect from "../customUI/MultiSelect";
import Loader from "../customUI/Loader";
import ImageUpload from "../customUI/ImageUpload";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import React from "react";
import { fetchData } from "@/lib/actions/fetchers";
import PageHeader from "../customUI/PageHeader";

export const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).trim(),
  media: z.array(z.string()).nonempty({ message: "Media has to be Uploaded" }),
  category: z.string().min(1, { message: "Category is required" }),
  collections: z
    .array(z.string())
    .max(3, { message: "Must be 3 or fewer collections selected" }),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  stock: z.record(z.string(), z.coerce.number().min(0)).default({}),
  prices: z.record(z.string(), z.coerce.number().min(0)).default({}),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showStockTable, setShowStockTable] = useState(false);

  // State for quick stock setting
  const [stockValue, setStockValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const getCollections = async () => {
    const data = await fetchData("collections")
    setCollections(data);
    setIsLoading(false)
  };

  const getCategories = async () => {
    const data = await fetchData("categories")
    setCategories(data);
    setIsLoading(false)
  };

  useEffect(() => {
    getCollections();
    getCategories();
  }, []);

  // color-size combinations
  const getStockKey = (color: string, size: string) => `${color}-${size}`;

  // initialize stock values from existing product
  const initializeStockValues = (product: ProductType) => {
    if (!product) return {};

    if (typeof product.stock === 'object' && product.stock !== null) {
      return product.stock;
    }

    const stockValues: Record<string, number> = {};

    (product.colors || []).forEach(color => {
      (product.sizes || []).forEach(size => {
        stockValues[getStockKey(color, size)] = 0;
      });
    });

    return stockValues;
  };

  const initializePriceValues = (product: ProductType) => {
    if (!product) return {};

    if (typeof product.prices === 'object' && product.prices !== null) {
      return product.prices;
    }

    const priceValues: Record<string, number> = {};
    const defaultPrice = product.price || 0.1;

    (product.colors || []).forEach(color => {
      (product.sizes || []).forEach(size => {
        priceValues[getStockKey(color, size)] = defaultPrice;
      });
    });

    return priceValues;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        collections: initialData.collections.map(
          (collection) => collection._id
        ),
        category:
          typeof initialData.category === "object"
            ? initialData.category._id
            : initialData.category || "",
        stock: initializeStockValues(initialData),
        prices: initializePriceValues(initialData),
      }
      : {
        title: "",
        description: "",
        media: [],
        category: "",
        collections: [],
        tags: [],
        sizes: [],
        colors: [],
        stock: {},
        prices: {},
        price: 0.1,
        expense: 0.1,
      },
  });

  useEffect(() => {

    const subscription = form.watch((value, { name, type }) => {

      console.log("Form change detected:", {
        field: name,
        type,
        value,
        allValues: form.getValues()
      });

      // sizes and colors
      if (name === 'sizes' || name === 'colors') {
        const sizes = value.sizes as string[] || [];
        const colors = value.colors as string[] || [];

        if (sizes.length > 0 && colors.length > 0) {
          setShowStockTable(true);

          const currentStock = { ...form.getValues('stock') };
          const currentPrices = { ...form.getValues('prices') };
          const defaultPrice = form.getValues('price');

          colors.forEach(color => {
            sizes.forEach(size => {
              const key = getStockKey(color, size);
              if (currentStock[key] === undefined) {
                currentStock[key] = 0;
              }
              if (currentPrices[key] === undefined) {
                currentPrices[key] = defaultPrice;
              }
            });
          });

          Object.keys(currentStock).forEach(key => {
            const [color, size] = key.split('-');
            if (!colors.includes(color) || !sizes.includes(size)) {
              delete currentStock[key];
              delete currentPrices[key];
            }
          });

          form.setValue('stock', currentStock);
          form.setValue('prices', currentPrices);
        } else {
          setShowStockTable(false);
        }
      }

      // price updates
      if (name === 'price') {
        const newPrice = value.price as number;
        const sizes = value.sizes as string[] || [];
        const colors = value.colors as string[] || [];

        if (sizes.length > 0 && colors.length > 0) {
          const currentPrices = { ...form.getValues('prices') };

          if (Object.keys(currentPrices).length > 0) {
            const shouldUpdate = window.confirm("Do you want to update all variant prices to the new base price?");
            if (shouldUpdate) {
              colors.forEach(color => {
                sizes.forEach(size => {
                  const key = getStockKey(color, size);
                  currentPrices[key] = newPrice;
                });
              });
              form.setValue('prices', currentPrices);
            }
          }
        }
      }
    });

    const initialSizes = form.getValues('sizes') || [];
    const initialColors = form.getValues('colors') || [];
    setShowStockTable(initialSizes.length > 0 && initialColors.length > 0);

    // Log initial form values
    console.log("Initial form values:", form.getValues());

    return () => subscription.unsubscribe();
  }, [form]);

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const applyStockToAll = () => {
    const quantity = parseInt(stockValue, 10) || 0;
    const newStock = { ...form.getValues("stock") };
    form.watch("colors").forEach(color => {
      form.watch("sizes").forEach(size => {
        newStock[getStockKey(color, size)] = quantity;
      });
    });
    form.setValue("stock", newStock);
    toast.success(`Set all variants to ${quantity} in stock`);
  };

  const applyPriceToAll = () => {
    const price = parseFloat(priceValue) || form.getValues("price");
    const newPrices = { ...form.getValues("prices") };
    form.watch("colors").forEach(color => {
      form.watch("sizes").forEach(size => {
        newPrices[getStockKey(color, size)] = price;
      });
    });
    form.setValue("prices", newPrices);
    toast.success(`Set all variants to €${price.toFixed(2)}`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.colors.length === 0) {
      values.colors = ["std"];
    }
    if (values.sizes.length === 0) {
      values.sizes = ["std"];
    }

    // Ensure all color-size combinations have stock and price values
    const stockData = { ...values.stock };
    const priceData = { ...values.prices };
    values.colors.forEach(color => {
      values.sizes.forEach(size => {
        const key = getStockKey(color, size);
        if (stockData[key] === undefined) {
          stockData[key] = 0;
        }
        if (priceData[key] === undefined) {
          priceData[key] = values.price;
        }
      });
    });

    values.stock = stockData;
    values.prices = priceData;

    try {
      setIsLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setIsLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    console.log(form)
  }, [form])

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="flexStart">
        <PageHeader title={`${initialData ? "Edit " : "Create "}Product`} />
        {initialData ? <Delete id={initialData._id} item="products" /> : ""}
      </div>
      <Separator className="bg-border mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-3 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="w-auto lg:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        rows={5}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) =>
                          field.onChange([...field.value, url])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter((image) => image !== url),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="md:grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expense"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {categories.length > 0 && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border border-border bg-input text-foreground rounded-md"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {collections.length > 0 && (
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Collections</FormLabel>
                    <FormControl >
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => collectionId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) => field.onChange([...field.value, size])}
                      onRemove={(sizeToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (size) => size !== sizeToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Stock Management Table with Prices */}
          {showStockTable && (
            <div className="mt-8 mb-6">
              <h3 className="text-lg font-semibold mb-4">Stock and Price Management</h3>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Set All Stock:</div>
                  <Input
                    type="number"
                    min="0"
                    className="w-24 h-8"
                    value={stockValue}
                    onChange={(e) => setStockValue(e.target.value)}
                    placeholder="0"
                  />
                  <Button
                    type="button"
                    onClick={applyStockToAll}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 py-0"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="bg-muted text-muted-foreground hover:bg-muted/80 h-8 py-0"
                  onClick={() => {
                    const newStock = { ...form.getValues("stock") };
                    form.watch("colors").forEach(color => {
                      form.watch("sizes").forEach(size => {
                        newStock[getStockKey(color, size)] = 0;
                      });
                    });
                    form.setValue("stock", newStock);
                    toast.success("All stock set to 0");
                  }}
                >
                  Set All Stock to 0
                </Button>
                <div className="w-[1px] bg-border mx-4" />
                <div className="flex items-center gap-2">
                  <div className="font-medium">Set All Prices (€):</div>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.01"
                    className="w-24 h-8"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    placeholder={form.getValues("price").toString()}
                  />
                  <Button
                    type="button"
                    onClick={applyPriceToAll}
                    className="bg-success hover:bg-success/90 text-success-foreground h-8 py-0"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="bg-muted text-muted-foreground hover:bg-muted/80 h-8 py-0"
                  onClick={() => {
                    const basePrice = form.getValues("price");
                    const newPrices = { ...form.getValues("prices") };
                    form.watch("colors").forEach(color => {
                      form.watch("sizes").forEach(size => {
                        newPrices[getStockKey(color, size)] = basePrice;
                      });
                    });
                    form.setValue("prices", newPrices);
                    toast.success(`All prices reset to base price: €${basePrice.toFixed(2)}`);
                  }}
                >
                  Reset All Prices to Base
                </Button>
              </div>

              {/* Stock and Price Table with Ordered Sizes */}
              <div className="bg-background p-2 rounded-lg border border-border shadow-sm overflow-auto">
                <Table className="border-collapse">
                  <TableHeader>
                    <TableRow className="h-8">
                      <TableHead className="w-[120px] p-1.5">Variant</TableHead>
                      <TableHead className="w-[120px] p-1.5">Type</TableHead>
                      {form.watch("sizes").map((size) => (
                        <TableHead key={`stock-${size}`} className="text-center p-1.5">{size}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-w-max">
                    {form.watch("colors").map((color: string) => (
                      <React.Fragment key={color}>
                        <TableRow className="h-10 text-accent-foreground">
                          <TableCell rowSpan={2} className="font-medium border-r border-border p-1.5">
                            {color}
                          </TableCell>
                          <TableCell className="bg-accent text-accent-foreground font-medium p-1.5">
                            Stock
                          </TableCell>
                          {form.watch("sizes").sort((a, b) => {
                            const numA = parseFloat(a);
                            const numB = parseFloat(b);
                            if (!isNaN(numA) && !isNaN(numB)) {
                              return numA - numB;
                            }
                            return a.localeCompare(b);
                          }).map((size) => {
                            const stockKey = getStockKey(color, size);
                            return (
                              <TableCell key={stockKey} className="text-center bg-accent p-1 py-0.5">
                                <FormField
                                  control={form.control}
                                  name={`stock.${stockKey}`}
                                  render={({ field }) => (
                                    <FormItem className="m-0">
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="0"
                                          placeholder="0"
                                          value={field.value || 0}
                                          className="w-20 h-7 text-center mx-auto text-sm py-0.5"
                                          onChange={(e) => {
                                            field.onChange(parseInt(e.target.value, 10) || 0);
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            );
                          })}
                        </TableRow>

                        <TableRow className="border-b-2 border-border h-10 text-secondary-foreground">
                          <TableCell className="bg-secondary text-secondary-foreground font-medium p-1.5">
                            Price (€)
                          </TableCell>
                          {form.watch("sizes").sort((a, b) => {
                            const numA = parseFloat(a);
                            const numB = parseFloat(b);
                            if (!isNaN(numA) && !isNaN(numB)) {
                              return numA - numB;
                            }
                            return a.localeCompare(b);
                          }).map((size) => {
                            const priceKey = getStockKey(color, size);
                            return (
                              <TableCell key={priceKey} className="text-center bg-secondary p-1 py-0.5">
                                <FormField
                                  control={form.control}
                                  name={`prices.${priceKey}`}
                                  render={({ field }) => (
                                    <FormItem className="m-0">
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          placeholder={form.getValues("price").toString()}
                                          value={field.value || form.getValues("price")}
                                          className="w-20 h-7 text-center mx-auto text-sm py-0.5"
                                          onChange={(e) => {
                                            field.onChange(parseFloat(e.target.value) || form.getValues("price"));
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <div className="flexStart gap-3 w-min">
            <Button
              type="submit"
              disabled={isLoading}
            >
              Submit
            </Button>

            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;