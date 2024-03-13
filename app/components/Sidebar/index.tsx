import { Fragment } from "react";
import { SidebarNav } from "./Nav";
import { FileComponent } from "./File";
import { useOpenStore } from "@/app/hooks/stores/useOpenStore";

export default function Sidebar() {
  const files = useOpenStore((state) => state.OpenFiles);

  const folders = files.filter((file) => file.children);
  const filesOnly = files.filter((file) => !file.children);
  folders.sort((a, b) => a.name!.localeCompare(b.name!));
  filesOnly.sort((a, b) => a.name!.localeCompare(b.name!));
  const sortedFiles = [...folders, ...filesOnly];

  return (
    <div className="w-full bg-zinc-900 overflow-y-auto h-screen">
      <SidebarNav />
      {sortedFiles.map((file, index) => (
        <Fragment key={`file-${file.path}-${index}`}>
          <FileComponent file={file} depth={0} />
        </Fragment>
      ))}
      <FileComponent
        file={{
          name: "Folder",
          path: "",
          children: [
            {
              path: "",
              name: "child.txt",
            },
            {
              path: "",
              name: "child.html",
            },
            {
              path: "",
              name: "SubFolder",
              children: [
                {
                  path: "",
                  name: "child.rs",
                },
              ],
            },
          ],
        }}
        depth={0}
      />
      <FileComponent
        file={{
          path: "",
          name: "child.rs",
        }}
        depth={0}
      />
    </div>
  );
}
