import { create } from "zustand";
import { ActiveFile, ActiveStore } from "../../../src/interfaces";

export const useActiveStore = create<ActiveStore>((set) => ({
  activeFile: {
    name: "untitled",
    path: "",
    content: "",
  },
  setActiveFile: (file: ActiveFile) =>
    set({
      activeFile: file,
    }),
}));
