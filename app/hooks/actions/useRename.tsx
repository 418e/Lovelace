import { renameFile } from "@tauri-apps/api/fs";

export const useRename = () => {
  const rename = async (path: string, Name: string) => {
    let Path = path.split("/");
    Path.pop();
    const newName = `${Path.join("/")}/${Name}`;
    await renameFile(path, newName);
  };
  return rename;
};
