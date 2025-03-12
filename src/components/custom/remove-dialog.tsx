"use client";
import React, { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";

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
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

export default function RemoveDialog({
  children,
  documentId,
}: RemoveDialogProps) {
  const remove = useMutation(api.documents.deleteDocument);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);

    remove({ id: documentId })
      .catch(() => {
        toast.error("Failed to delete document");
      })
      .then(() => {
        toast.success("Document deleted successfully");
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
