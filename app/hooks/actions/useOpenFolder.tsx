import { useOpenStore } from "@/app/hooks/stores/useOpenStore";
import { open } from "@tauri-apps/api/dialog";
import { BaseDirectory, readDir, writeTextFile } from "@tauri-apps/api/fs";
import { create } from "zustand";
import { FolderPathStore } from "../../interfaces";

export const useFolderPathStore = create<FolderPathStore>((set) => ({
  FolderPath: "",
  setFolderPath: (path: string) =>
    set({
      FolderPath: path,
    }),
}));

export const useOpenFolder = () => {
  const setFiles = useOpenStore((state) => state.setOpenFiles);
  const setFolderPath = useFolderPathStore((state) => state.setFolderPath);

  const openFolder = async (path?: string) => {
    try {
      if (path) {
        const fileList = await readDir(path, {
          recursive: true,
        });
        setFolderPath(path);
        setFiles(fileList);
      } else {
        const folderPath = await open({
          directory: true,
          multiple: false,
          recursive: true,
        });

        if (folderPath) {
          const fileList = await readDir(folderPath as string, {
            recursive: true,
          });
          setFolderPath(folderPath as string);
          setFiles(fileList);
        }
      }
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };
  return openFolder;
};
