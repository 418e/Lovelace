"use client";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { Context } from "..";
import MonacoEditor from "react-monaco-editor";
import { useActiveStore } from "@/app/hooks/useActiveStore";

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

export const Editor: React.FC = () => {
  const [Input, setInput] = useState<string>("");
  const ActiveFile = useActiveStore((state) => state.activeFiles)[0];
  console.log(ActiveFile);
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
    <Context.Menu>
      <Context.Content>
        <Context.Item>Soon</Context.Item>
      </Context.Content>
      <Context.Trigger className="dark">
        <MonacoEditor
          className="w-full h-full pt-2"
          language={SuffixToLang(ActiveFile.suffix || "txt")}
          theme="vs-dark"
          value={Input}
          options={{
            language: SuffixToLang(ActiveFile.suffix || "txt"),
            theme: "vs-dark",
          }}
          onChange={setInput}
        />
      </Context.Trigger>
    </Context.Menu>
  );
};
