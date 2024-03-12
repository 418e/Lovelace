"use client";
import { useEffect } from "react";
import { Editor, Sidebar, Resize } from "./components";
import { useOpenStore } from "./hooks/useOpenStore";

export default function Home() {
  const setFiles = useOpenStore((state) => state.setOpenFiles);
  
  useEffect(() => {
    let item = localStorage.getItem("item");
    if (item) {
      setFiles(JSON.parse(item));
    }
  }, []);

  return (
    <Resize.ResizablePanelGroup
      direction="horizontal"
      className="flex flex-nowrap"
    >
      <Resize.ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
        <Sidebar.default />
      </Resize.ResizablePanel>
      <Resize.ResizableHandle />
      <Resize.ResizablePanel defaultSize={80}>
        <Editor.default />
      </Resize.ResizablePanel>
    </Resize.ResizablePanelGroup>
  );
}
