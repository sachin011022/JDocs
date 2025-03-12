import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface UpdateDialogProps {
  children: React.ReactNode;
  intialTitle: string;
  documentId: Id<"documents">;
}

export default function UpdateDialog({
  children,
  documentId,
  intialTitle,
}: UpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(intialTitle);
  const [isUpdating, setIsUpdating] = useState(false);

  //   convex api
  const update = useMutation(api.documents.updateDocument);

  // hadle to submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({
      id: documentId,
      title: title.trim() || "Undefined",
    })
      .catch(() => {
        toast.error("Failed to update document");
      })
      .then(() => {
        toast.success("Document updated successfully");
      })
      .finally(() => {
        setIsUpdating(false);
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for your document
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              className='w-full'
              placeholder='Document name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant={"ghost"}
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Apply
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
