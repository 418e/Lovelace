import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app//components/Sidebar";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lovelace",
  description: "Lovelace editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " dark"}>
        <div className="flex flex-nowrap">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
