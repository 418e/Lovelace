import { SidebarNav } from "./Nav";
import { FileComponent } from "./File";
import { useOpenStore } from "../../hooks/stores/useOpenStore";
export default function Sidebar() {
  const files = useOpenStore((state) => state.OpenFiles);

  const folders = files.filter((file) => file.children);
  const filesOnly = files.filter((file) => !file.children);
  folders.sort((a, b) => a.name!.localeCompare(b.name!));
  filesOnly.sort((a, b) => a.name!.localeCompare(b.name!));
  const sortedFiles = [...folders, ...filesOnly];

  return (
    <div className="bg-zinc-900 overflow-y-auto h-screen overflow-x-hidden min-w-72 w-96">
      <SidebarNav />
      {sortedFiles.map((file, index) => (
        <div key={`file-${file.path}-${index}`} className="relative">
          <FileComponent file={file} depth={0} />
        </div>
      ))}
      {/* <FileComponent
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
      /> */}
    </div>
  );
}
