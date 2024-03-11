import { Context } from "..";
import { exists, copyFile, removeFile, FileEntry } from "@tauri-apps/api/fs";
import { Activate } from "./utils";
import { ActiveFile } from "@/app/interfaces";

export const ContextMenuItem = ({
  file,
  setState,
}: {
  file: FileEntry;
  setState: (value: ActiveFile) => void;
}) => {
  return (
    <Context.ContextMenuContent>
      <Context.ContextMenuItem onClick={() => Activate(file, setState)}>
        Open
      </Context.ContextMenuItem>
      <Context.ContextMenuItem>Cut</Context.ContextMenuItem>
      <Context.ContextMenuItem
        onClick={async () =>
          await copyFile(
            file.path,
            (await exists(`${file.path}-copied`))
              ? `${file.path}-copied (1)`
              : `${file.path}-copied`
          )
        }
      >
        Copy
      </Context.ContextMenuItem>
      <Context.ContextMenuItem
        onClick={async () => await navigator.clipboard.writeText(file.path)}
      >
        Copy path
      </Context.ContextMenuItem>
      <Context.ContextMenuItem>Rename</Context.ContextMenuItem>
      <Context.ContextMenuItem
        onClick={async () => await removeFile(file.path)}
      >
        Delete
      </Context.ContextMenuItem>
    </Context.ContextMenuContent>
  );
};
