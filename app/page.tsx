"use client";
import { useState } from "react";
import Editor from "./components/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import Sidebar from "./components/Sidebar";
import { ActiveFile } from "./interfaces";

export default function Home() {
  const [ActiveFile, setActiveFile] = useState<ActiveFile>({
    name: "untitled",
    path: "",
    content: "",
  });

  return (
    <ResizablePanelGroup direction="horizontal" className="flex flex-nowrap">
      <Sidebar setState={setActiveFile} />
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <Editor ActiveFile={ActiveFile} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}