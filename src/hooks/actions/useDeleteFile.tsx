import { removeFile } from "@tauri-apps/api/fs";
import { useRefreshDir } from "./useRefreshDir";

export const useDeleteFile = () => {
  const refresh = useRefreshDir();
  return async (Path: string) => await removeFile(Path).then(refresh);
};
