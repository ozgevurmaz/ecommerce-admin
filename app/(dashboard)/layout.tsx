import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToastProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stylie - Admin Dashboard",
  description: "Admin dashboard to manage Stylie's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <div className="flex max-lg:flex-col text-gray-1">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1 lg:ml-[250px] mt-24 lg:mt-0"> {children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
