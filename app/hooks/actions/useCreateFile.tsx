import { writeTextFile } from "@tauri-apps/api/fs";
import { useRefreshDir } from "./useRefreshDir";

export const useCreateFile = () => {
  const refresh = useRefreshDir();
  return async (Path: string, Content: string) =>
    await writeTextFile(Path, Content).then(refresh);
};
