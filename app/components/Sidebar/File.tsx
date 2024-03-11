import { FileComponentProps } from "@/app/interfaces";
import { Collapse, Context } from "..";
import { TiDocument, TiFolder } from "react-icons/ti";
import { Activate } from "./utils";

export const FileComponent: React.FC<FileComponentProps> = ({
  file,
  depth,
  setState,
}) => {
  if (!file.children) {
    return (
      <Context.ContextMenuTrigger
        title={file.path}
        className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] w-full`}
        style={{ paddingLeft: `${2 * depth + 1}rem` }}
        onClick={() => Activate(file, setState)}
      >
        <TiDocument /> {file.name}
      </Context.ContextMenuTrigger>
    );
  }

  return (
    <Collapse.Collapsible key={file.name}>
      <Collapse.CollapsibleTrigger
        title={file.path}
        className={`bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] w-full`}
        style={{ paddingLeft: `${1.2 * depth + 1}rem` }}
      >
        <TiFolder /> {file.name}
      </Collapse.CollapsibleTrigger>
      <Collapse.CollapsibleContent>
        {file.children.map((subfile, i) => (
          <FileComponent
            key={`sub-${subfile.name}-${i}`}
            file={subfile}
            setState={setState}
            depth={depth + 1}
          />
        ))}
      </Collapse.CollapsibleContent>
    </Collapse.Collapsible>
  );
};
