import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RemoveDialog from "@/components/custom/remove-dialog";
import UpdateDialog from "@/components/custom/update-dialog";

interface DropdownMenuButtonProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

export default function DropdownMenuButton({
  documentId,
  onNewTab,
  title,
}: DropdownMenuButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className='rounded-full'>
          <MoreVerticalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* remove components */}
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className='text-red-500' /> Remove
          </DropdownMenuItem>
        </RemoveDialog>

        {/* Update document */}
        <UpdateDialog documentId={documentId} intialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon /> Update
          </DropdownMenuItem>
        </UpdateDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon /> Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
