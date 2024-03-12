import { TiFolderOpen } from "react-icons/ti";
import { MenuBar } from "./MenuBar";
import { MenuItem } from "./MenuItem";
import { useOpenFolder } from "@/app/hooks/useOpenFolder";

export const FileBar = () => {
  const openFolder = useOpenFolder();
  return (
    <MenuBar>
      <MenuItem Icon={TiFolderOpen} title="Open" action={openFolder} />
    </MenuBar>
  );
};
