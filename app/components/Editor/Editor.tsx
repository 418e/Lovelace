"use client";
import { useState, useEffect, useRef } from "react";
import Lines from "./Lines";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";

function compile(
  input: string,
  symbols: string[],
  stringLits: string[],
  keywords?: string[]
): { token: string; type: string }[] {
  const symbolPattern = symbols.map((s) => escapeRegExp(s)).join("|");
  const stringLitPattern = stringLits.map((s) => escapeRegExp(s)).join("|");
  const keywordPattern = keywords?.join("|");

  const tokenPattern = new RegExp(
    `(${symbolPattern}|${stringLitPattern}|${
      keywordPattern && keywordPattern
    }|\\w+|\\s|\\n|[^\\w\\s])`,
    "g"
  );

  const tokens = input.match(tokenPattern) || [];
  return tokens.map((token) => {
    if (symbols.includes(token)) {
      return { token, type: "symbol" };
    } else if (stringLits.includes(token)) {
      return { token, type: "string" };
    } else if (keywords?.includes(token)) {
      return { token, type: "keyword" };
    } else if (token.match(/\n/)) {
      return { token, type: "newline" };
    } else if (token.match(/\s/)) {
      return { token, type: "whitespace" };
    } else if (token.match(/\d/)) {
      return { token, type: "digit" };
    } else if (!token.match(/[^\\w\\s]/)) {
      return { token, type: "non-word" };
    } else {
      return { token, type: "word" };
    }
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Editor() {
  const [highlighted, setHighlighted] = useState<
    { token: string; type: string }[]
  >([]);
  const [lineCount, setLineCount] = useState<number>(1);
  const symbols = ["<", ">", "=", "/"];
  const string_lits = ["'", '"'];
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const lines = textAreaRef.current.value.split("\n").length;
      setLineCount(lines);
    }
  }, [highlighted]);

  return (
    <div className="editor-container">
      <Lines lineCount={lineCount} />
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuItem>Soon</ContextMenuItem>
          <ContextMenuItem>Soon</ContextMenuItem>
          <ContextMenuItem>Soon</ContextMenuItem>
          <ContextMenuItem>Soon</ContextMenuItem>
        </ContextMenuContent>
        <ContextMenuTrigger className="dark">
          <textarea
            ref={textAreaRef}
            onChange={(e) =>
              setHighlighted(compile(e.target.value, symbols, string_lits))
            }
            className="editor-textarea pl-6 focus:outline-none"
          />
          <div className="editor-highlighted pl-6">
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
