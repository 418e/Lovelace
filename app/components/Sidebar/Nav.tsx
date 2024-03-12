import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { TiDocumentAdd, TiFolderAdd, TiFolderOpen } from "react-icons/ti";
import { useOpenFolder } from "../ui/useOpenFolder";

export const SidebarNav = () => {
  const openFolder = useOpenFolder();
  return (
    <div className="flex flex-nowrap justify-end gap-3 p-2">
      <TiDocumentAdd
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
      />
      <TiFolderAdd
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
        onClick={async () =>
          await createDir(BaseDirectory.AppData + "/new_folder")
        }
      />
      <TiFolderOpen
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
        onClick={openFolder}
      />
    </div>
  );
};
