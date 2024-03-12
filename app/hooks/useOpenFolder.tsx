import { useOpenStore } from "@/app/hooks/useOpenStore";
import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";

export const useOpenFolder = () => {
  const setFiles = useOpenStore((state) => state.setOpenFiles);
  const openFolder = async () => {
    try {
      const folderPath = await open({
        directory: true,
        multiple: false,
        recursive: true,
      });

      if (folderPath) {
        const fileList = await readDir(folderPath as string, {
          recursive: true,
        });
        setFiles(fileList);
        localStorage.setItem("files", JSON.stringify(fileList));
      }
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };
  return openFolder;
};
