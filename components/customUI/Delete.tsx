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
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import router from "next/router";


interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/collections/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsLoading(false);
        toast.success("Deleted successfully");
        window.location.href = "/collections";
        router.push("/api/collections")
      }
    } catch (error) {
      console.log("[Delete]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 text-white">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 ">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
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
