import React from "react";
import ReactDOM from "react-dom/client";
import { Editor, Sidebar } from "./components";
import "./index.css";

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-nowrap">
      <Sidebar.default />
      <Editor.default />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
