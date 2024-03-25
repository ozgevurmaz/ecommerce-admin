"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="stinky left-0 top-0 w-full flexBetween bg-brown shadow-xl px-8 py-4 lg:hidden">
      <Image src="/StylieLogo.png" alt="logo" width={150} height={70} />

      <nav className="flex gap-5 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`text-body-medium ${
              pathname === link.url ? "text-nude" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav> 
      <div className="relative flex items-center gap-4">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <nav className="flexStart flex-col gap-8 z-20 absolute top-14 right-1 bg-white border border-white p-4 rounded-xl shadow-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="text-body-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
