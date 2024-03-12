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
  activeFiles: ActiveFile[];
  resetActiveFiles: () => void;
  setActiveFiles: (file: ActiveFile) => void;
  addActiveFile: (file: ActiveFile) => void;
  removeActiveFile: (file: ActiveFile) => void;
}

export interface OpenStore {
  OpenFiles: FileEntry[];
  resetOpenFiles: () => void;
  setOpenFiles: (files: FileEntry[]) => void;
  addOpenFile: (file: FileEntry) => void;
  removeOpenFile: (file: FileEntry) => void;
}
