"use client";
import { Tab } from "..";
import { FileBar } from "./Menus";

const Menu: React.FC = () => {
  return (
    <Tab.Default defaultValue="file" className="bg-zinc-800 border-b">
      <Tab.List className="bg-transparent py-0 border-b border-zinc-600 w-screen justify-start h-8">
        <Tab.Trigger value="file" className="py-0 h-full">
          File
        </Tab.Trigger>
      </Tab.List>
      <Tab.Content value="file">
        <FileBar />
      </Tab.Content>
    </Tab.Default>
  );
};

export default Menu;
