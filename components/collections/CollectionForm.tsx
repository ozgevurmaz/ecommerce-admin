"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customUI/ImageUpload";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import Delete from "../customUI/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(500).trim(),
  image: z.string(),
});
interface CollectionDataProps {
  initialData?: CollectionType | null;
}
const CollectionForm: React.FC<CollectionDataProps> = ({ initialData }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setIsLoading(false);
        toast.success(`Collection ${initialData ? "updated" : "created."}`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (err) {
      console.log("[CollectionForm]", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-10">
      <div className="flexStart gap-12">
        <h2 className="text-heading2-bold">
          {initialData ? "Edit " : "Create "}Collection
        </h2>
        {initialData ? <Delete id={initialData._id} /> : ""}
      </div>
      <Separator className="my-4 bg-grey mt-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Textarea placeholder="Description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flexStart flex-col gap-3 text-white w-min">
            <Button
              type="submit"
              className={`bg-grey ${isLoading ? "disabled" : ""}`}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-red-500"
              onClick={() => router.push("/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>{" "}
    </div>
  );
};

export default CollectionForm;
