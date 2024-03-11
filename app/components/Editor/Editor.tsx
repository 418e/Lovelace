"use client";
import { useState, useEffect, useRef } from "react";
import Lines from "./Lines";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";
import { ActiveFile } from "@/app/interfaces";
import { writeTextFile } from "@tauri-apps/api/fs";
import { compile } from "./compiler";

export function Editor({ ActiveFile }: { ActiveFile: ActiveFile }) {
  const [highlighted, setHighlighted] = useState<
    { token: string; type: string }[]
  >([]);
  const [lineCount, setLineCount] = useState<number>(1);
  const [Input, setInput] = useState<string>("");
  // html example
  const symbols: string[] = ["<", ">", "=", "/"];
  const string_lits: string[] = ["'", '"'];
  //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const lines = textAreaRef.current.value.split("\n").length;
      setLineCount(lines);
    }
  }, [highlighted]);

  useEffect(() => {
    writeFile(Input);
  }, [Input]);

  useEffect(() => {
    setInput(ActiveFile.content);
    setHighlighted(compile(ActiveFile.content, symbols, string_lits));
  }, [ActiveFile]);

  const writeFile = async (input: string) => {
    await writeTextFile(ActiveFile.path, input || ActiveFile.content);
  };

  return (
    <div className="relative w-full h-full">
      <Lines lineCount={lineCount} />
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuItem>Soon</ContextMenuItem>
        </ContextMenuContent>
        <ContextMenuTrigger className="dark">
          <textarea
            value={Input}
            ref={textAreaRef}
            onChange={(e) => {
              setInput(e.target.value);
              setHighlighted(compile(e.target.value, symbols, string_lits));
            }}
            className="absolute top-0 left-0 w-full h-full overflow-hidden bg-transparent text-transparent caret-white resize-none select-none pl-6 focus:outline-none"
          />
          <div className="absolute top-0 left-0 w-full h-full overflow-auto pointer-events-none  pl-6">
            {highlighted.map((tokenObj, index) => (
              <span
                key={index}
                className={`ada-${tokenObj.type} whitespace-pre-wrap`}
              >
                {tokenObj.token}
              </span>
            ))}
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
}