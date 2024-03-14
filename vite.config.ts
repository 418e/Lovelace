import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import MonacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), MonacoEditorPlugin({
    
  })],
});
