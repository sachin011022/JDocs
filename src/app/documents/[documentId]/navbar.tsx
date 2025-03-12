"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import Logo from "@/components/logo/Logo";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  ClipboardMinusIcon,
  FileJsonIcon,
  FilePenIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SaveIcon,
  StrikethroughIcon,
  Table2Icon,
  TrashIcon,
  TypeOutlineIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";

interface NavbarProps {
  data: Doc<"documents">;
}

export default function Navbar({ data }: NavbarProps) {
  const { editor } = useEditorStore();

  const handleJSON = () => {
    const json = editor?.getJSON();
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleHTML = () => {
    const html = editor?.getHTML();
    const blob = new Blob([html!], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTEXT = () => {
    const text = editor?.getText();
    const blob = new Blob([text!], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleInsertTable = ({
    cols,
    rows,
  }: {
    cols: number;
    rows: number;
  }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: rows, cols: cols, withHeaderRow: true })
      .run();
  };

  const handlePDF = () => {
    window.print();
  };

  return (
    <nav className='w-full p-3 flex items-center justify-between'>
      {/* logo  */}
      <div className='flex items-center gap-x-3'>
        <Link href={"/"} className='flex items-center gap-x-3 print:hidden'>
          <Logo />
          <h1 className='text-3xl font-bold'>
            <span className='text-blue-700'>J</span>Docs
          </h1>
        </Link>
      </div>

      {/* menubar items */}
      <>
        <Menubar className='gap-x-8 print:hidden'>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent className='print:hidden'>
              <MenubarSub>
                <MenubarSubTrigger>
                  <SaveIcon className='mr-2 size-4' />
                  Save
                </MenubarSubTrigger>
                <MenubarSubContent onClick={handleJSON}>
                  <MenubarItem>
                    <FileJsonIcon />
                    JSON
                  </MenubarItem>
                  <MenubarItem onClick={handleHTML}>
                    <GlobeIcon />
                    HTML
                  </MenubarItem>
                  <MenubarItem onClick={handlePDF}>
                    <FileTextIcon />
                    PDF
                  </MenubarItem>
                  <MenubarItem onClick={handleTEXT}>
                    <TypeOutlineIcon />
                    Text
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                <ClipboardMinusIcon />
                New Document
              </MenubarItem>

              <MenubarSeparator />
              <MenubarItem>
                <FilePenIcon />
                Rename
              </MenubarItem>
              <MenubarItem>
                <TrashIcon />
                Remove
              </MenubarItem>

              <MenubarSeparator />
              <MenubarItem onClick={() => window.print()}>
                <PrinterIcon />
                Print <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                <Undo2Icon />
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>

              <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                <Redo2Icon />
                Redo <MenubarShortcut>⌘Y</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Insert</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>
                  <Table2Icon className='mr-2 size-4' />
                  Table
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => handleInsertTable({ cols: 1, rows: 1 })}
                  >
                    1 x 1
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => handleInsertTable({ cols: 2, rows: 2 })}
                  >
                    2 x 2
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => handleInsertTable({ cols: 3, rows: 3 })}
                  >
                    3 x 3
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => handleInsertTable({ cols: 4, rows: 4 })}
                  >
                    4 x 4
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Format</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>
                  <TypeOutlineIcon className='mr-2 size-4' />
                  Text
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                  >
                    <BoldIcon />
                    Bold<MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                  >
                    <ItalicIcon />
                    Italic <MenubarShortcut>⌘I</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().toggleUnderline().run()
                    }
                  >
                    <UnderlineIcon />
                    Underline <MenubarShortcut>⌘U</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().toggleUnderline().run()
                    }
                  >
                    <StrikethroughIcon />
                    Strikethrough &nbsp;
                  </MenubarItem>
                </MenubarSubContent>
                <MenubarItem>
                  <RemoveFormattingIcon />
                  Remove Formatting
                </MenubarItem>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </>

      {/* clerk and organization switcher */}
      <div className='flex items-center gap-4 pl-6'>
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />

        <UserButton />
      </div>
    </nav>
  );
}
