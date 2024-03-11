import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
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
      <body className={font.className + " bg-black text-white"}>
        {children}
      </body>
    </html>
  );
}
