import { FileEntry } from "@tauri-apps/api/fs";

export interface ActiveFile {
  name?: string;
  path: string;
  suffix?: string;
  children?: FileEntry[];
  content: string;
}

export interface FileComponentProps {
  file: FileEntry;
  depth: number;
}

export interface ActiveStore {
  activeFile: ActiveFile;
  setActiveFile: (file: ActiveFile) => void;
}

export interface OpenStore {
  OpenFiles: FileEntry[];
  resetOpenFiles: () => void;
  setOpenFiles: (files: FileEntry[]) => void;
  addOpenFile: (file: FileEntry) => void;
  removeOpenFile: (file: FileEntry) => void;
}

export interface FolderPathStore {
  FolderPath: string;
  setFolderPath: (path: string) => void;
}