import { FileEntry } from "@tauri-apps/api/fs";

export interface ActiveFile {
  name?: string;
  path: string;
  suffix?: string;
  children?: FileEntry[];
  content: string;
}

export interface LanguageSupport {
  symbols?: string[];
  stringLits?: string[];
  keywords?: string[];
}