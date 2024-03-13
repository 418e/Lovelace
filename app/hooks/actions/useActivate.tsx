import { FileEntry, readTextFile } from "@tauri-apps/api/fs";
import { useActiveStore } from "../stores/useActiveStore";

export const useActivate = (file: FileEntry) => {
  const setActiveFile = useActiveStore((state) => state.setActiveFile);

  const activate = async () => {
    const splitted: string[] | undefined = file.name?.split(".");
    setActiveFile({
      name: file.name,
      path: file.path,
      suffix: splitted![splitted!?.length - 1],
      children: file.children,
      content: await readTextFile(file.path),
    });
  };

  return activate;
};
