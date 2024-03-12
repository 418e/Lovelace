"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Menu } from "./components";
const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " bg-black text-white"}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
