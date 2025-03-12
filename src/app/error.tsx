"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='center flex-col min-h-screen space-y-6 '>
      <div className='text-center space-y-4 '>
        <div className='flxe justify-center'>
          <div className='bg-rose-100 p-3 rounded-full'>
            <AlertTriangleIcon className='size-10 flex justify-center text-rose-600' />
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <Button onClick={reset} className='font-medium'>
          <Link href={"/"}>Try again</Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          onClick={reset}
          className='font-medium'
        >
          <Link href={"/"}>Go back</Link>
        </Button>
      </div>
    </div>
  );
}
