import { Fragment } from "react";
import { SidebarNav } from "./Nav";
import { FileComponent } from "./File";
import { useOpenStore } from "@/app/hooks/useOpenStore";

export function Sidebar() {
  const files = useOpenStore((state) => state.OpenFiles);

  const folders = files.filter((file) => file.children);
  const filesOnly = files.filter((file) => !file.children);
  folders.sort((a, b) => a.name!.localeCompare(b.name!));
  filesOnly.sort((a, b) => a.name!.localeCompare(b.name!));
  const sortedFiles = [...folders, ...filesOnly];

  return (
    <div className="w-full bg-zinc-900 overflow-y-auto h-[88vh]">
      <SidebarNav />
      {sortedFiles.map((file, index) => (
        <Fragment key={`file-${file.path}-${index}`}>
          <FileComponent file={file} depth={0} />
        </Fragment>
      ))}
    </div>
  );
}
