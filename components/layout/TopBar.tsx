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
  const [notifications, setNotifications] = useState(3); // Example notification count
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
    <header className="fixed left-0 top-0 w-full bg-white border-b border-gray-200 shadow-sm z-10 lg:pl-64">
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
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {dropdownMenu ? (
                <X className="h-5 w-5 text-gray-500" />
              ) : (
                <Menu className="h-5 w-5 text-gray-500" />
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
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          
          {/* Quick action buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Calendar className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MessageSquare className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingBag className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-500" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {notifications}
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
          className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-md z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  href={link.url}
                  key={link.label}
                  className={`flex items-center px-3 py-3 rounded-md ${
                    isActive 
                      ? "bg-brown/10 text-brown font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`${isActive ? "text-brown" : "text-gray-500"} mr-3`}>
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