import { renameFile } from "@tauri-apps/api/fs";
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

export const Rename = async (path: string, Name: string) => {
  let Path = path.split("/");
  Path.pop();
  const newName = `${Path.join("/")}/${Name}`;
  await renameFile(path, newName);
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
    case "png":
      return <SiImagej />;
    default:
      return <TiDocument />;
  }
};
