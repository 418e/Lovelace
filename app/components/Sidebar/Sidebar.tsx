"use client";
import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readDir, FileEntry } from "@tauri-apps/api/fs";
import { ResizablePanel } from "../ui/resizable";
import { FaFile, FaFolder } from "react-icons/fa";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export function Sidebar() {
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

  return (
    <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
      <div className="sidebar">
        <button onClick={openFolder}>Open Folder</button>
        <ul>
          {files.map((file: FileEntry, index: number) => {
            return !file.children ? (
              <li
                title={file.path}
                className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-2 w-full"
                key={`${file.name}-${index}`}
              >
                <FaFile /> {file.name}
              </li>
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
                      <li
                        title={subfile.path}
                        className="bg-zinc-900 px-1 text-sm cursor-pointer hover:bg-black/70 transition-all flex flex-nowrap items-center gap-x-1 py-[2px] pl-6 w-full"
                        key={`sub-${subfile.name}-${index}-${i}`}
                      >
                        <FaFile /> {subfile.name}
                      </li>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </ul>
      </div>
    </ResizablePanel>
  );
}
