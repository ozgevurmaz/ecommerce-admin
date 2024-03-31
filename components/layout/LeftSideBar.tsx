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
    <header className="h-screen fixed left-0 top-0 flexBetween flex-col bg-brown max-lg:hidden shadow-xl gap-16 p-10">
      <Image src="/StylieLogo.png" alt="logo" width={150} height={70} />
      <nav className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flexStart gap-4 text-body-medium ${
              pathname === link.url ? "text-nude" : ""
            }`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </nav>

      <div className="flexCenter gap-4 text-body-medium">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </header>
  );
};

export default LeftSideBar;
