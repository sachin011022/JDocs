"use client";

// tiptap extensions
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

// custom fontSize
import { FontSize } from "@/extensions/font-size";

// image resize
import ImageResize from "tiptap-extension-resize-image";

// tiptap react
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// editor store
import { useEditorStore } from "@/store/use-editor-store";

// live block
import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";
import { Threads } from "./Threads";

interface EditorProps {
  initialContent?: string | undefined;
}

export default function Editor({ initialContent }: EditorProps) {
  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: " padding-left:56px; padding-right:56px;",
        class:
          "focus:outline-none print:outline-none bg-white border rounded border-[#c7c7c7] flex flex-col min-h-[1054px] w-[820px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      TaskList,
      Image,
      ImageResize,
      Dropcursor,
      TaskItem.configure({
        nested: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      FontFamily,

      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),

      // custom extensions
      FontSize,
    ],
    immediatelyRender: false,
    content: ``,
  });
  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <div className='min-w-max flex justify-center w-[820px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} className='editor' />
        <Threads editor={editor} />
        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
}
