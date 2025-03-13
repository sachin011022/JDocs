import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { Doc } from "../../../convex/_generated/dataModel";
import DocumentRow from "./DocumentRow";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}
export default function DocumentsTable({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='center h-24'>
          <LoaderIcon className='animate-spin text-muted-foreground size-5' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead>Shared</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>

          {documents.length === 0 ? (
            <TableCaption>
              <p>No documents found.</p>
            </TableCaption>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className='center'>
        <Button
          variant={"ghost"}
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore" ? "Load More" : "End of documents"}
        </Button>
      </div>
    </div>
  );
}
