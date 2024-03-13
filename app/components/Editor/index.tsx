"use client";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { Context } from "..";
import MonacoEditor from "react-monaco-editor";
import { useActiveStore } from "@/app/hooks/stores/useActiveStore";

const Editor: React.FC = () => {
  const [Input, setInput] = useState<string>("");
  const ActiveFile = useActiveStore((state) => state.activeFile);

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
      <Context.Trigger className="dark w-full h-full">
        <MonacoEditor
          className="w-full h-full pt-2"
          theme="vs-dark"
          value={Input}
          editorDidMount={(e) => e.focus()}
          onChange={setInput}
        />
      </Context.Trigger>
    </Context.Menu>
  );
};

export default Editor;
