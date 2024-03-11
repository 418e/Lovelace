"use client";
import { Fragment, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import {
  readDir,
  FileEntry,
  readTextFile,
  removeFile,
} from "@tauri-apps/api/fs";
import { FaFile, FaFolder } from "react-icons/fa";
import { ActiveFile } from "@/app/interfaces";
import { Context, Collapse } from "..";
import { SidebarNav } from "./Nav";

export function Sidebar({
  setState,
}: {
  setState: (value: ActiveFile) => void;
}) {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const openFolder = async () => {
    try {
      const folderPath = await open({
        directory: true,
        multiple: false,
      });

      if (folderPath) {
        const fileList = await readDir(folderPath as string, {
          recursive: true,
        });
        setFiles(fileList);
        console.log(fileList);
      }
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };

  const Activate = async (file: FileEntry) => {
    const splitted = file.name?.split(".");
    setState({
      name: file.name,
      path: file.path,
      suffix: splitted![splitted!?.length - 1],
      children: file.children,
      content: await readTextFile(file.path),
    });
  };

  const ContextMenuItem = ({ file }: { file: FileEntry }) => {
    return (
      <Context.ContextMenuContent>
        <Context.ContextMenuItem onClick={() => Activate(file)}>
          Open
        </Context.ContextMenuItem>
        <Context.ContextMenuItem>Cut</Context.ContextMenuItem>
        <Context.ContextMenuItem>Copy</Context.ContextMenuItem>
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

  return (
    <div className="w-full bg-zinc-900 overflow-y-auto h-screen">
      <SidebarNav openFolder={openFolder} />
      <Context.ContextMenu>
        {files.map((file: FileEntry, index: number) => {
          return !file.children ? (
            <Fragment key={`file-${file.path}`}>
              <ContextMenuItem file={file} />
              <Context.ContextMenuTrigger
                title={file.path}
                className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-2 w-full"
                key={`${file.name}-${index}`}
                onClick={() => Activate(file)}
              >
                <FaFile /> {file.name}
              </Context.ContextMenuTrigger>
            </Fragment>
          ) : (
            <Collapse.Collapsible key={`${file.name}-${index}`}>
              <Collapse.CollapsibleTrigger
                title={file.path}
                className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-2 w-full"
              >
                <FaFolder /> {file.name}
              </Collapse.CollapsibleTrigger>
              <Collapse.CollapsibleContent>
                {file.children!?.map((subfile: FileEntry, i: number) => {
                  return (
                    <Fragment key={`sub-${subfile.name}-${index}-${i}`}>
                      <ContextMenuItem file={subfile} />
                      <Context.ContextMenuTrigger
                        title={subfile.path}
                        className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-6 w-full"
                        onClick={() => Activate(subfile)}
                      >
                        <FaFile /> {subfile.name}
                      </Context.ContextMenuTrigger>
                    </Fragment>
                  );
                })}
              </Collapse.CollapsibleContent>
            </Collapse.Collapsible>
          );
        })}
      </Context.ContextMenu>
    </div>
  );
}
