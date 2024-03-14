import { useFolderPathStore, useOpenFolder } from "./useOpenFolder";

export const useRefreshDir = (): (() => void) => {
  const FolderPath = useFolderPathStore((state) => state.FolderPath);
  const openFolder = useOpenFolder();
  return () => openFolder(FolderPath);
};
