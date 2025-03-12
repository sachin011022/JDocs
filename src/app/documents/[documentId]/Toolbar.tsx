"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Level } from "@tiptap/extension-heading";
import { SketchPicker } from "react-color";

import { Input } from "@/components/ui/input";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronsDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquareIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ToolbarProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const TootlBarButton = ({ onClick, icon: Icon, isActive }: ToolbarProps) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className={cn(
        "text-sm min-w-7 flex items-center justify-center rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white",
        isActive && "bg-neutral-700/80 "
      )}
    >
      <Icon />
    </Button>
  );
};

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("uderline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquareIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,

        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
      { label: "Times New Roman", value: "Times New Roman" },
      { label: "Courier New", value: "Courier New" },
      { label: "Comic Sans MS", value: "Comic Sans MS" },
      { label: "Verdana", value: "Verdana" },
      { label: "Trebuchet MS", value: "Trebuchet MS" },
      { label: "Impact", value: "Impact" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
      { label: "Segoe UI", value: "Segoe UI" },
      { label: "Roboto", value: "Roboto" },
      { label: "Open Sans", value: "Open Sans" },
      { label: "Lato", value: "Lato" },
      { label: "Montserrat", value: "Montserrat" },
    ];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='w-7 border'>
          <Button
            variant={"ghost"}
            className=' w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            <span className='truncate'>
              {editor?.getAttributes("textStyle").fontFamily || "Arial"}
            </span>
            <ChevronsDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {fonts.map((fontItem) => (
            <Button
              key={fontItem.label}
              onClick={() =>
                editor?.chain().focus().setFontFamily(fontItem.value).run()
              }
              variant={"ghost"}
              className={cn(
                "h-7 truncate space-y-1 w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white",
                editor?.getAttributes("textStyle").fontFamily ===
                  fontItem.value && "bg-neutral-700/80 text-white"
              )}
              style={{ fontFamily: fontItem.value }}
            >
              <span className='truncate'>{fontItem.label}</span>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const HeadingButton = () => {
    const { editor } = useEditorStore();

    const headings = [
      { label: "Normal text", value: 0, fontSize: "16px" },
      { label: "H1", value: 1, fontSize: "32px" },
      { label: "H2", value: 2, fontSize: "24px" },
      { label: "H3", value: 3, fontSize: "20px" },
      { label: "H4", value: 4, fontSize: "18px" },
      { label: "H5", value: 5, fontSize: "16px" },
    ];

    const getLevel = () => {
      for (let i = 1; i <= 5; i++) {
        if (editor?.isActive("heading", { level: i })) {
          return `Heading ${i}`;
        }
      }

      return "Normal text";
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='w-7 border'>
          <Button
            variant={"ghost"}
            className='w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            <span className='truncate'>{getLevel()}</span>
            <ChevronsDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='space-y-2'>
          {headings.map((heading) => (
            <Button
              key={heading.label}
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run()
              }
              variant={"ghost"}
              className={cn(
                "h-7 truncate space-y-1 w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white",
                editor?.isActive("heading", { level: heading.value }) &&
                  "bg-neutral-700/80 text-white"
              )}
              style={{ fontSize: heading.fontSize }}
            >
              <span className='truncate'>{heading.label}</span>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const TextColor = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";
    // return <SketchPicker color={value} onChangeComplete={(color) => editor?.chain().focus().setColor(color.hex).run()}/>;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className='shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            <BaselineIcon style={{ color: value }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2'>
          <SketchPicker
            color={value}
            onChange={(color) =>
              editor?.chain().focus().setColor(color.hex).run()
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const HighlightColor = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("highlight").color || "#000000";
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className='shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            <HighlighterIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SketchPicker
            color={value}
            onChange={(color) =>
              editor?.chain().focus().setHighlight({ color: color.hex }).run()
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const LinkButton = () => {
    const { editor } = useEditorStore();

    const [value, setValue] = useState(
      editor?.getAttributes("link").href || ""
    );

    const onChange = (href: string) => {
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
      setValue("");
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className='shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            <Link2Icon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2 flex items-center gap-x-2'>
          <Input
            placeholder='https://google.com'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className='cursor-pointer' onClick={() => onChange(value)}>
            Apply
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const ImageButton = () => {
    const { editor } = useEditorStore();

    const [imageUrl, setImageUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onChange = (src: string) => {
      editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          onChange(imageUrl);
        }
      };

      input.click();
    };

    const handleImageUrlSubmit = () => {
      if (imageUrl) {
        onChange(imageUrl);
        setImageUrl("");
        setIsDialogOpen(false);
      }
    };
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className='shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
            >
              <ImageIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onUpload}>
              <UploadIcon className='size-4 mr-2' />
              Upload
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              <SearchIcon className='size-4 mr-2' />
              Paste image url
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert image url</DialogTitle>
            </DialogHeader>
            <Input
              placeholder='Insert image url'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit();
                }
              }}
            />
            <DialogFooter>
              <Button onClick={handleImageUrlSubmit}>Insert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const TextAlignButton = () => {
    const { editor } = useEditorStore();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className='border w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            Align
            <ChevronsDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2'>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={cn(
              editor?.isActive({ textAlign: "left" }) &&
                "bg-neutral-700/80 text-white"
            )}
          >
            <span className='flex items-center'>
              <AlignLeftIcon
                className='size-4 mr-2'
                style={{
                  color: editor?.isActive({ textAlign: "left" })
                    ? "white"
                    : "inherit",
                }}
              />
              Left
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={cn(
              editor?.isActive({ textAlign: "center" }) &&
                "bg-neutral-700/80 text-white"
            )}
          >
            <span className='flex items-center'>
              <AlignCenterIcon
                className='size-4 mr-2'
                style={{
                  color: editor?.isActive({ textAlign: "center" })
                    ? "white"
                    : "inherit",
                }}
              />
              Center
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={cn(
              editor?.isActive({ textAlign: "right" }) &&
                "bg-neutral-700/80 text-white"
            )}
          >
            <span className='flex items-center'>
              <AlignRightIcon
                className='size-4 mr-2'
                style={{
                  color: editor?.isActive({ textAlign: "right" })
                    ? "white"
                    : "inherit",
                }}
              />
              Right
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            className={cn(
              editor?.isActive({ textAlign: "justify" }) &&
                "bg-neutral-700/80 text-white"
            )}
          >
            <span className='flex items-center'>
              <AlignJustifyIcon
                className='size-4 mr-2'
                style={{
                  color: editor?.isActive({ textAlign: "justify" })
                    ? "white"
                    : "inherit",
                }}
              />
              Justify
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const FontSizeButton = () => {
    const fontSizes = [
      8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
    ];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className='border w-[120px] shrink-0 flex items-center justify-between rounded-sm  hover:bg-neutral-700/80 cursor-pointer hover:text-white '
          >
            Font size
            <ChevronsDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2'>
          {fontSizes.map((size) => (
            <DropdownMenuItem
              key={size}
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .setMark("textStyle", {
                    fontSize: `${size}px`,
                  })
                  .run();
              }}
              className={cn(
                editor?.isActive("textStyle", { fontSize: `${size}px` }) &&
                  "bg-neutral-700/80 text-white"
              )}
            >
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-1.5 print:hidden min-h-6 flex items-center gap-x-0.5 overflow-auto'>
      {/* undo redo sections */}
      {sections[0].map((item) => (
        <TootlBarButton key={item.label} {...item} />
      ))}
      <div className='h-6 bg-neutral-900 w-[1px] mx-1' />

      {/* font family */}
      <FontFamilyButton />
      <div className='h-6 bg-neutral-900 w-[1px] mx-1' />

      {/* heading */}
      <HeadingButton />
      <div className='h-6 bg-neutral-900 w-[1px] mx-1' />

      {/* font size */}
      <FontSizeButton />
      <div className='h-6 bg-neutral-900 w-[1px] mx-1' />

      {/* font style */}
      {sections[1].map((item) => (
        <TootlBarButton key={item.label} {...item} />
      ))}

      {/* text color */}
      <TextColor />

      {/* highlight color */}
      <HighlightColor />

      <div className='h-6 bg-neutral-900 w-[1px] mx-1' />
      {/* link  */}
      <LinkButton />

      {/* Image */}
      <ImageButton />

      {/* align */}
      <TextAlignButton />

      {/* list */}

      {sections[2].map((item) => (
        <TootlBarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
