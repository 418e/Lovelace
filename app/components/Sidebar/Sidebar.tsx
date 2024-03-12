"use client";
import { Fragment, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readDir, FileEntry } from "@tauri-apps/api/fs";
import { ActiveFile } from "@/app/interfaces";
import { Context } from "..";
import { SidebarNav } from "./Nav";
import { FileComponent } from "./File";
import { ContextMenuItem } from "./Context";

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
        recursive: true,
      });

      if (folderPath) {
        const fileList = await readDir(folderPath as string, {
          recursive: true,
        });
        setFiles(fileList);
      }
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };

  return (
    <div className="w-full bg-zinc-900 overflow-y-auto h-screen">
      <SidebarNav openFolder={openFolder} />
      <Context.ContextMenu>
        {files.map((file, index) => (
          <Fragment key={`file-${file.path}-${index}`}>
            <ContextMenuItem file={file} setState={setState} />
            <FileComponent file={file} depth={0} setState={setState} />
          </Fragment>
        ))}
      </Context.ContextMenu>
    </div>
  );
}
