import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { FaFileCirclePlus, FaFolderOpen, FaFolderPlus } from "react-icons/fa6";

export const SidebarNav = ({ openFolder }: { openFolder: () => void }) => {
  return (
    <div className="flex flex-nowrap justify-end gap-3 p-2">
      <FaFileCirclePlus
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
      />
      <FaFolderPlus
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
        onClick={async () =>
          await createDir(BaseDirectory.AppData + "/new_folder")
        }
      />
      <FaFolderOpen
        size={20}
        className="text-zinc-200 hover:text-zinc-300 cursor-pointer transition-all"
        onClick={openFolder}
      />
    </div>
  );
};
