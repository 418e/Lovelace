"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
const font: NextFont = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement<{ children: React.ReactNode }> {
  return (
    <html lang="en">
      <body className={font.className + " bg-black text-white"}>
        {children}
      </body>
    </html>
  );
}
