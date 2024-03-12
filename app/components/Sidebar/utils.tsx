import { FileEntry, readTextFile } from "@tauri-apps/api/fs";
import {
  SiC,
  SiGo,
  SiHtml5,
  SiImagej,
  SiJavascript,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript,
} from "react-icons/si";
import { TiDocument } from "react-icons/ti";
export const Activate = async (file: FileEntry, setState: any) => {
  const splitted: string[] | undefined = file.name?.split(".");
  setState({
    name: file.name,
    path: file.path,
    suffix: splitted![splitted!?.length - 1],
    children: file.children,
    content: await readTextFile(file.path),
  });
};

export const LanguageLogo = ({ suffix }: { suffix: string }) => {
  switch (suffix) {
    case "html":
      return <SiHtml5 />;
    case "js":
      return <SiJavascript />;
    case "ts":
      return <SiTypescript />;
    case "tsx":
      return <SiReact />;
    case "rs":
      return <SiRust />;
    case "go":
      return <SiGo />;
    case "py":
      return <SiPython />;
    case "c":
      return <SiC />;
    case "png": // add more later
      return <SiImagej />;
    default:
      return <TiDocument />;
  }
};
