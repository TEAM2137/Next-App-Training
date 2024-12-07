import type { Metadata } from "next";
import { Inter, Rubik, Caveat, Orbitron, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team 2137 Next App Training",
  description: "Training Sandboc for student programmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64"><Navbar /></div>
        <div className="bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-96px)]">
          {children}
        </div>
      </body>
    </html>
  );
}