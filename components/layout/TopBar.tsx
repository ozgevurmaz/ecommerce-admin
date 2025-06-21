"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  Search,
  ShoppingBag,
  Calendar,
  MessageSquare
} from "lucide-react";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownMenu) setDropdownMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenu]);

  // Close menu when route changes
  useEffect(() => {
    setDropdownMenu(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 top-0 w-full bg-card border-b border-border shadow-sm z-10 lg:pl-64">
      {/* Main TopBar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left section - Logo and menu for mobile */}
        <div className="flex items-center">
          <div className="lg:hidden mr-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownMenu(!dropdownMenu);
              }}
              className="p-2 rounded-md hover:bg-muted transition-colors"
            >
              {dropdownMenu ? (
                <X className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>

          <div className="lg:hidden">
            <Image
              src="/StylieLogo.png"
              alt="Stylie"
              width={100}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right section - Quick actions and user */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search */}
          <div className="relative flex items-center">
            {/* Search Input - slides in from right */}
            <div
              className={`absolute right-12 transition-all duration-300 ease-in-out ${isExpanded
                  ? "w-64 opacity-100 translate-x-0"
                  : "w-0 opacity-0 translate-x-4 pointer-events-none"
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-background border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                onBlur={() => setIsExpanded(false)}
                autoFocus={isExpanded}
              />
            </div>

            {/* Search Button */}
            <button
              className="relative z-10 p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105"
              onMouseEnter={() => setIsExpanded(true)}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Search className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105">
              <Calendar className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105">
              <MessageSquare className="h-5 w-5 text-foreground" />
            </button>
            <button className="p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105">
              <ShoppingBag className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 group">
              <Bell className="h-5 w-5 text-secondary-foreground group-hover:text-primary transition-colors duration-200" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground shadow-lg animate-pulse border-2 border-background">
                  {notifications > 99 ? '99+' : notifications}
                </span>
              )}
            </button>
          </div>
          {/* User profile */}
          <div className="border-l pl-4 ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {dropdownMenu && (
        <div
          className="lg:hidden absolute top-16 left-0 w-full bg-card border-b border-bordershadow-md z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  href={link.url}
                  key={link.label}
                  className={`flex items-center px-3 py-3 rounded-md ${isActive
                    ? "bg-muted text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                    }`}
                >
                  <span className={`${isActive ? "text-primary" : "text-foreground"} mr-3`}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopBar;