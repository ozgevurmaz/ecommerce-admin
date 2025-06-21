"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <header className="h-screen fixed left-0 top-0 flexBetween flex-col bg-card max-lg:hidden shadow-xl gap-10 py-5 px-8 z-20">
      <Image src="/StylieLogo.png" alt="logo" width={150} height={70} />
      <nav className="flex flex-col gap-2 xl:gap-5 ">
        {navLinks.map((link) => (
          <div key={link.label} className="relative w-full">
            <div 
              className={`absolute -left-3 top-0 w-1 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                pathname === link.url 
                  ? "h-full opacity-100 scale-y-100" 
                  : "h-0 opacity-0 scale-y-0"
              }`} 
            />
            <div className="absolute inset-0 -mx-2 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
             <Link
              href={link.url}
              className={`relative flexStart gap-4 text-body-medium transition-all duration-200 ease-in-out transform group-hover:translate-x-1 ${
                pathname === link.url 
                  ? "text-primary font-medium" 
                  : "text-foreground group-hover:text-primary"
              }`}
            >
              {link.icon}
              <p>{link.label}</p>
            </Link>
          </div>
        ))}
      </nav>
      <div></div>
    </header>
  );
};

export default LeftSideBar;
