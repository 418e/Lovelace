import { create } from "zustand";
import { OpenStore } from "../../interfaces";
import { FileEntry } from "@tauri-apps/api/fs";

export const useOpenStore = create<OpenStore>((set) => ({
  OpenFiles: [],
  resetOpenFiles: () =>
    set({
      OpenFiles: [],
    }),
  setOpenFiles: (files: FileEntry[]) =>
    set({
      OpenFiles: files,
    }),
  addOpenFile: (file: FileEntry) =>
    set((state: OpenStore) => ({
      ...state,
      activeFiles: [...state.OpenFiles, file],
    })),
  removeOpenFile: (file: FileEntry) =>
    set((state: OpenStore) => ({
      ...state,
      openFiles: state.OpenFiles.filter((item: FileEntry) => item !== file),
    })),
}));
