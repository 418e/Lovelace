import { FileEntry, readTextFile } from "@tauri-apps/api/fs";

export const Activate = async (file: FileEntry, setState: any) => {
  const splitted = file.name?.split(".");
  setState({
    name: file.name,
    path: file.path,
    suffix: splitted![splitted!?.length - 1],
    children: file.children,
    content: await readTextFile(file.path),
  });
};
