"use client";
import { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import {
  readDir,
  FileEntry,
  readTextFile,
} from "@tauri-apps/api/fs";
import { ResizablePanel } from "../ui/resizable";
import { FaFile, FaFolder } from "react-icons/fa";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ActiveFile } from "@/app/interfaces";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
} from "../ui/context-menu";

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
  return (
    <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
      <div className="sidebar">
        <button onClick={openFolder}>Open Folder</button>

        <ContextMenu>
          <ContextMenuContent>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuItem>Cut</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Copy path</ContextMenuItem>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>

          {files.map((file: FileEntry, index: number) => {
            return !file.children ? (
              <ContextMenuTrigger
                title={file.path}
                className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-2 w-full"
                key={`${file.name}-${index}`}
                onClick={() => Activate(file)}
              >
                <FaFile /> {file.name}
              </ContextMenuTrigger>
            ) : (
              <Collapsible>
                <CollapsibleTrigger
                  title={file.path}
                  className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-2 w-full"
                  key={`${file.name}-${index}`}
                >
                  <FaFolder /> {file.name}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {file.children!?.map((subfile: FileEntry, i: number) => {
                    return (
                      <ContextMenuTrigger
                        title={subfile.path}
                        className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-6 w-full"
                        key={`sub-${subfile.name}-${index}-${i}`}
                        onClick={() => Activate(subfile)}
                      >
                        <FaFile /> {subfile.name}
                      </ContextMenuTrigger>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </ContextMenu>
      </div>
    </ResizablePanel>
  );
}
