import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "../components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resakss Data Visualisation",
  description: "Bubble Chart Visualisation for Resakss data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-slate-950 min-h-screen overflow-x-hidden`}
      >
        <main className="px-8 py-4 w-screen max-w-[1400px] 2xl:max-w-none mx-auto h-full flex flex-col gap-4 overflow-x-hidden">
          <Header />
          <div className="flex flex-grow flex-1 w-full overflow-hidden">
            <div className="w-full flex-grow">{children}</div>
            <Sidebar />
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
