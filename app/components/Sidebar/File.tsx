import { FileComponentProps } from "@/app/interfaces";
import { FilePlain } from "./FilePlain";
import { FileDir } from "./FileDir";

export const FileComponent: React.FC<FileComponentProps> = ({
  file,
  depth,
}) => {
  if (!file.children) {
    return <FilePlain file={file} depth={depth} />;
  }
  return <FileDir file={file} depth={depth} />;
};
