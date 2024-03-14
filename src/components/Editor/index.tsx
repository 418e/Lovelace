import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useActiveStore } from "../../hooks/stores/useActiveStore";
import MonacoEditor from "react-monaco-editor";

const Editor: React.FC = () => {
  const [Input, setInput] = useState<string>("");
  const ActiveFile = useActiveStore((state) => state.activeFile);

  useEffect(() => {
    const writeFile = async () => {
      await writeTextFile(ActiveFile.path, Input || ActiveFile.content);
    };
    writeFile();
  }, [Input]);

  useEffect(() => {
    setInput(ActiveFile.content);
  }, [ActiveFile]);

  return (
    <MonacoEditor
      className="pt-2 w-full h-screen"
      theme="vs-dark"
      language="javascript"
      value={Input}
      editorDidMount={(e) => e.focus()}
      onChange={setInput}
    />
  );
};

export default Editor;
