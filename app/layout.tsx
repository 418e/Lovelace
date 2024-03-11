import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app//components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
const font = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lovelace",
  description: "Lovelace editor",
  icons: "icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " dark"}>
        <div className="">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex flex-nowrap"
          >
            <Sidebar />
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </body>
    </html>
  );
}
