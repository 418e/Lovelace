"use client";
import { useState } from "react";
import { Editor, Sidebar, Resize } from "./components";
import { ActiveFile } from "./interfaces";

export default function Home() {
  const [ActiveFile, setActiveFile] = useState<ActiveFile>({
    name: "untitled",
    path: "",
    content: "",
  });

  return (
    <Resize.ResizablePanelGroup
      direction="horizontal"
      className="flex flex-nowrap"
    >
      <Resize.ResizablePanel defaultSize={15} minSize={10} maxSize={40}>
        <Sidebar.default setState={setActiveFile} />
      </Resize.ResizablePanel>
      <Resize.ResizableHandle />
      <Resize.ResizablePanel defaultSize={85}>
        <Editor.default ActiveFile={ActiveFile} />
      </Resize.ResizablePanel>
    </Resize.ResizablePanelGroup>
  );
}
