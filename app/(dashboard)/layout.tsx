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
          <div className="flex min-h-screen bg-background">
            <LeftSideBar />
            <div className="flex-1 lg:ml-52">
              {/* Top Bar */}
              <TopBar />
              
              {/* Main Content */}
              <main className="pt-12 mx-4 mt-8 md:mx-6 lg:mr-8">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
