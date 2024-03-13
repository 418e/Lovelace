import { createDir } from "@tauri-apps/api/fs";
import { useRefreshDir } from "./useRefreshDir";

export const useCreateDirectory = () => {
  const refresh = useRefreshDir();
  return async (Path: string) =>
    await createDir(Path, { recursive: true }).then(refresh);
};
