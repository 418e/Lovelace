"use client";
import { useState, useEffect } from "react";
import { TiDocumentAdd, TiDocumentDelete, TiFolderOpen } from "react-icons/ti";
import { MenuBar } from "../MenuBar";
import { MenuItem } from "../MenuItem";
import {
  useFolderPathStore,
  useOpenFolder,
} from "@/app/hooks/actions/useOpenFolder";
import { useActiveStore } from "@/app/hooks/stores/useActiveStore";
import { FileEntry } from "@tauri-apps/api/fs";
import { useCreateFile } from "@/app/hooks/actions/useCreateFile";
import { useCreateDirectory } from "@/app/hooks/actions/useCreateDirectory";
import { useDeleteFile } from "@/app/hooks/actions/useDeleteFile";

const FileBar = () => {
  const [File, setFile] = useState<FileEntry | null>(null);
  const openFolder = useOpenFolder();
  const ActiveFile = useActiveStore((state) => state.activeFile);
  const FolderPath = useFolderPathStore((state) => state.FolderPath);
  const createFile = useCreateFile();
  const createDirectory = useCreateDirectory();
  const deleteFile = useDeleteFile();

  useEffect(() => {
    ActiveFile.path && setFile(ActiveFile);
  }, [ActiveFile]);

  return (
    <MenuBar>
      <MenuItem Icon={TiFolderOpen} title="Open" action={openFolder} />
      <MenuItem
        Icon={TiDocumentAdd}
        title="Create File"
        action={() => createFile(`${FolderPath}/new-file`, "")}
        disabled={!FolderPath}
      />
      <MenuItem
        Icon={TiDocumentAdd}
        title="Create Folder"
        action={() => createDirectory(`${FolderPath}/NewFolder`)}
        disabled={!FolderPath}
      />
      <MenuItem
        Icon={TiDocumentDelete}
        title="Delete"
        action={() => deleteFile(File?.path!)}
        disabled={!File}
      />
    </MenuBar>
  );
};

export default FileBar;
