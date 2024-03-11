"use client";
import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readDir, FileEntry } from "@tauri-apps/api/fs";

export function Sidebar() {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const openFolder = async () => {
    try {
      const folderPath = await open({
        directory: true,
        multiple: false,
      });

      if (folderPath) {
        const fileList = await readDir(folderPath as string);
        setFiles(fileList);
        console.log(fileList);
      }
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };

  return (
    <div className="sidebar">
      <button onClick={openFolder}>Open Folder</button>
      <ul>
        {files.map((file: any, index: number) => {
          return <li key={file.name + index}>{file.name}</li>;
        })}
      </ul>
    </div>
  );
}
