"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import router from "next/router";


interface DeleteProps {
  id: string;
  item: "products" | "collections" | "categories";
  showText?: boolean;
}

const Delete: React.FC<DeleteProps> = ({ id, item, showText }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/${item}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsLoading(false);
        toast.success("Deleted successfully");
        router.push(`/api/${item}`)
      }
    } catch (error) {
      console.log("[Delete]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="flex text-destructive focus:text-destructive">
          <Trash2 className="text-destructive h-4 w-4" />
          <span className={`${showText ? "" : "hidden"}`}>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive ">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground"
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
