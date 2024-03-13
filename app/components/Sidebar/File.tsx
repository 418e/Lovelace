import { FileComponentProps } from "@/app/interfaces";
import { Collapse } from "..";
import { TiFolder } from "react-icons/ti";
import { useState } from "react";
import { useOpenStore } from "@/app/hooks/stores/useOpenStore";
import { FileEntry } from "@tauri-apps/api/fs";
import { useActivate } from "@/app/hooks/actions/useActivate";
import { useRename } from "@/app/hooks/actions/useRename";
import { useFsLogo } from "@/app/hooks/actions/useFsLogo";

export const FileComponent: React.FC<FileComponentProps> = ({
  file,
  depth,
}) => {
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [Input, setInput] = useState<string>(file.name || "");
  const removeOpenFile = useOpenStore((state) => state.removeOpenFile);
  const addOpenFile = useOpenStore((state) => state.addOpenFile);
  const Activate = useActivate(file);
  const Rename = useRename();
  const Logo = useFsLogo();
  if (!file.children) {
    const fileSuffix = file.name?.split(".")[file.name?.split(".").length - 1];
    return (
      <div
        title={file.path}
        className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-1 w-full`}
        style={{ paddingLeft: `${8 * depth + 1}px` }}
        onClick={() => Activate()}
        onDoubleClick={() => setIsRenaming(true)}
      >
        <Logo suffix={fileSuffix || "text"} />
        {isRenaming ? (
          <input
            className="w-full bg-transparent text-white border-zinc-400"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                try {
                  e.preventDefault();
                  Rename(file.path, Input);
                  let Path = file.path.split("/");
                  Path.pop();
                  const newPath = `${Path.join("/")}/${Input}`;
                  const newFile: FileEntry = {
                    path: newPath,
                    children: file.children,
                    name: Input,
                  };
                  removeOpenFile(file);
                  addOpenFile(newFile);
                  setIsRenaming(false);
                } catch (err) {
                  console.log(err);
                }
              } else if (e.key == "Escape") {
                setIsRenaming(false);
              }
            }}
          />
        ) : (
          file.name
        )}
      </div>
    );
  }

  const childFolders = file.children.filter((file) => file.children);
  const childFiles = file.children.filter((file) => !file.children);
  childFolders.sort((a, b) => a.name!.localeCompare(b.name!));
  childFiles.sort((a, b) => a.name!.localeCompare(b.name!));
  const sortedFiles = [...childFolders, ...childFiles];

  return (
    <Collapse.def key={file.name}>
      <Collapse.Trigger
        title={file.path}
        className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-1 w-full`}
        style={{ paddingLeft: `${8 * depth + 1}px` }}
      >
        <TiFolder /> {file.name}
      </Collapse.Trigger>
      <Collapse.Content>
        {sortedFiles.map((subfile, i) => (
          <FileComponent
            key={`sub-${subfile.name}-${i}`}
            file={subfile}
            depth={depth + 1}
          />
        ))}
      </Collapse.Content>
    </Collapse.def>
  );
};
