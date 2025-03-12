"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./Toolbar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export default function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <div className='print:hidden'></div>
      <Room>
        <Navbar data={document} />
        <Toolbar />
        <Editor initialContent={document.initialContent} />
      </Room>
    </div>
  );
}
