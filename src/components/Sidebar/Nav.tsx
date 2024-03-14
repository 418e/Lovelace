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
import { useCreateDirectory } from "../../hooks/actions/useCreateDirectory";
import { useCreateFile } from "../../hooks/actions/useCreateFile";
import { SiGit } from "react-icons/si";

export const SidebarNav = () => {
  const openFolder = useOpenFolder();
  const createDirectory = useCreateDirectory();
  const FolderPath = useFolderPathStore((state) => state.FolderPath);
  const createFile = useCreateFile();

  return (
    <div className="flex justify-between">
      <div className="flex flex-nowrap items-center gap-3 p-2">
        <TiFolder
          size={20}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
        />
        <SiGit
          size={16}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
        />
        <FaSearch
          size={16}
          className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
          onClick={() => {}}
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
