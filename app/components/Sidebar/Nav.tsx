import {
  TiDocumentAdd,
  TiFolder,
  TiFolderAdd,
  TiFolderOpen,
} from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import {
  useFolderPathStore,
  useOpenFolder,
} from "../../hooks/actions/useOpenFolder";
import { useCreateDirectory } from "@/app/hooks/actions/useCreateDirectory";
import { useCreateFile } from "@/app/hooks/actions/useCreateFile";
import { SiGit, SiHelpdesk } from "react-icons/si";

export const SidebarNav = () => {
  const openFolder = useOpenFolder();
  const createDirectory = useCreateDirectory();
  const FolderPath = useFolderPathStore((state) => state.FolderPath);
  const createFile = useCreateFile();

  return (
    <div className="flex flex-nowrap justify-between">
      <div className="flex flex-nowrap gap-3 p-2">
        <TiFolder
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => createFile(`${FolderPath}/new-file`, "")}
        />
        <SiGit
          size={16}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => createDirectory(`${FolderPath}/NewFolder`)}
        />
        <FaSearch
          size={16}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => openFolder()}
        />
      </div>
      <div className="flex flex-nowrap gap-3 p-2">
        <TiDocumentAdd
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => createFile(`${FolderPath}/new-file`, "")}
        />
        <TiFolderAdd
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => createDirectory(`${FolderPath}/NewFolder`)}
        />
        <TiFolderOpen
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => openFolder()}
        />
      </div>
    </div>
  );
};
