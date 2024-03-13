"use client";
import { Editor, Sidebar, Resize } from "./components";

export default function Home(): React.ReactNode {
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
