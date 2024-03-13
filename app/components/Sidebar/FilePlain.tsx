import { useActivate } from "@/app/hooks/actions/useActivate";
import { useFsLogo } from "@/app/hooks/actions/useFsLogo";
import { useRename } from "@/app/hooks/actions/useRename";
import { useOpenStore } from "@/app/hooks/stores/useOpenStore";
import { FileComponentProps } from "@/app/interfaces";
import { FileEntry } from "@tauri-apps/api/fs";
import { useState } from "react";
import { TiClipboard, TiEdit, TiTrash } from "react-icons/ti";

export const FilePlain: React.FC<FileComponentProps> = ({ file, depth }) => {
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [Input, setInput] = useState<string>(file.name || "");
  const removeOpenFile = useOpenStore((state) => state.removeOpenFile);
  const addOpenFile = useOpenStore((state) => state.addOpenFile);
  const Activate = useActivate(file);
  const Rename = useRename();
  const Logo = useFsLogo();
  const fileSuffix = file.name?.split(".")[file.name?.split(".").length - 1];

  return (
    <div
      title={file.path}
      className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap justify-between items-center gap-x-1 py-1 w-full group ${
        depth > 0 && "border-l"
      }`}
      style={{ marginLeft: `${8 * depth + 1}px` }}
      onClick={() => Activate()}
      onDoubleClick={() => setIsRenaming(!isRenaming)}
    >
      <div className="flex p-0 flex-nowrap items-center">
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
      <div className="p-0 flex-nowrap hidden group-hover:flex">
        <TiEdit
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
        />
        <TiClipboard
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
        />
        <TiTrash
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
