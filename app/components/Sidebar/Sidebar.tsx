import { Fragment } from "react";
import { SidebarNav } from "./Nav";
import { FileComponent } from "./File";
import { useOpenStore } from "@/app/hooks/useOpenStore";

export function Sidebar() {
  const files = useOpenStore((state) => state.OpenFiles);

  return (
    <div className="w-full bg-zinc-900 overflow-y-auto h-screen">
      <SidebarNav />
      {files.map((file, index) => (
        <Fragment key={`file-${file.path}-${index}`}>
          <FileComponent file={file} depth={0} />
        </Fragment>
      ))}
    </div>
  );
}
