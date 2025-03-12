import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { BookTextIcon, Building2Icon, CircleUserIcon } from "lucide-react";

import { Doc } from "../../../convex/_generated/dataModel";

import DropdownMenuButton from "./DropdownMenuButton";
import { TableCell, TableRow } from "@/components/ui/table";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export default function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter();

  const onNewTab = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };

  return (
    <TableRow
      className='cursor-pointer'
      onClick={() => router.push(`/documents/${document._id}`)}
    >
      <TableCell className='w-[50px]'>
        <BookTextIcon className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='font-medium'>{document.title}</TableCell>
      <TableCell className='h-full'>
        {document.organisationId ? (
          <div className='md:flex items-center gap-2 hidden'>
            <Building2Icon className='size-6' /> Organisation
          </div>
        ) : (
          <div className='hidden md:flex items-center gap-2'>
            <CircleUserIcon className='size-6' /> Personal
          </div>
        )}
      </TableCell>
      <TableCell className='text-muted-foreground hidden md:table-cell'>
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className='flex-auto justify-end'>
        <DropdownMenuButton
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTab}
        />
      </TableCell>
    </TableRow>
  );
}
