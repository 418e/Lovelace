import { useCreateDirectory } from "@/app/hooks/actions/useCreateDirectory";
import { useCreateFile } from "@/app/hooks/actions/useCreateFile";
import { FileComponentProps } from "@/app/interfaces";
import { Collapse } from "..";
import { TiDocumentAdd, TiFolder, TiFolderAdd, TiTrash } from "react-icons/ti";
import { FileComponent } from "./File";

export const FileDir: React.FC<FileComponentProps> = ({ file, depth }) => {
  const createFile = useCreateFile();
  const createDirectory = useCreateDirectory();
  const childFolders = file.children!.filter((file) => file.children);
  const childFiles = file.children!.filter((file) => !file.children);
  childFolders.sort((a, b) => a.name!.localeCompare(b.name!));
  childFiles.sort((a, b) => a.name!.localeCompare(b.name!));
  const sortedFiles = [...childFolders, ...childFiles];

  return (
    <Collapse.def key={file.name}>
      <Collapse.Trigger
        title={file.path}
        className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap justify-between items-center gap-x-1 py-1 w-full group`}
        style={{ paddingLeft: `${8 * depth + 1}px` }}
      >
        <div className="flex p-0 flex-nowrap items-center">
          <TiFolder /> {file.name}
        </div>
        <div className="p-0 flex-nowrap hidden group-hover:flex">
          <TiDocumentAdd
            size={20}
            className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
            onClick={() => createFile(`${file.path}/new-file`, "")}
          />
          <TiFolderAdd
            size={20}
            className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
            onClick={() => createDirectory(`${file.path}/NewFolder`)}
          />
          <TiTrash
            size={20}
            className="text-zinc-200 hover:text-zinc-400 cursor-pointer transition-all"
            onClick={() => {}}
          />
        </div>
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
