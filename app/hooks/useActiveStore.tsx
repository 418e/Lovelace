import { create } from "zustand";
import { ActiveFile, ActiveStore } from "../interfaces";

export const useActiveStore = create<ActiveStore>((set) => ({
  activeFiles: [
    {
      name: "untitled",
      path: "",
      content: "",
    },
  ],
  resetActiveFiles: () =>
    set({
      activeFiles: [
        {
          name: "untitled",
          path: "",
          content: "",
        },
      ],
    }),
  setActiveFiles: (file: ActiveFile) =>
    set({
      activeFiles: [file],
    }),
  addActiveFile: (file: ActiveFile) =>
    set((state: ActiveStore) => ({
      ...state,
      activeFiles: [...state.activeFiles, file],
    })),
  removeActiveFile: (file: ActiveFile) =>
    set((state: ActiveStore) => ({
      ...state,
      activeFiles: state.activeFiles.filter(
        (item: ActiveFile) => item !== file
      ),
    })),
}));
