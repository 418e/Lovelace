"use client";
import { useEffect, useRef, useState } from "react";
import { ActiveFile } from "@/app/interfaces";
import { writeTextFile } from "@tauri-apps/api/fs";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";
import MonacoEditor from "react-monaco-editor";

const SuffixToLang = (Suffix: string) => {
  if (Suffix === "html" || Suffix == "htm") {
  }
  switch (Suffix) {
    case "md":
      return "markdown";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "rs":
      return "rust";
    default:
      return Suffix;
  }
};

export const Editor: React.FC<{
  ActiveFile: ActiveFile;
}> = ({ ActiveFile }) => {
  const [Input, setInput] = useState<string>("");

  useEffect(() => {
    writeFile(Input);
  }, [Input]);

  useEffect(() => {
    setInput(ActiveFile.content);
  }, [ActiveFile]);

  const writeFile = async (input: string) => {
    await writeTextFile(ActiveFile.path, input || ActiveFile.content);
  };

  return (
    <ContextMenu>
      <ContextMenuContent>
        <ContextMenuItem>Soon</ContextMenuItem>
      </ContextMenuContent>
      <ContextMenuTrigger className="dark">
        <MonacoEditor
          className="w-full h-full"
          language={'javascript'}
          theme="vs-dark"
          value={Input}
          onChange={setInput}
        />
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
