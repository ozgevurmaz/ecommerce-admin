"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
<<<<<<< HEAD
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  ShoppingBag, 
  Calendar, 
  MessageSquare 
=======
import {
  Menu,
  X,
  Bell,
  Search,
  ShoppingBag,
  Calendar,
  MessageSquare
>>>>>>> 9029510 (fixed things)
} from "lucide-react";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
<<<<<<< HEAD
  const [notifications, setNotifications] = useState(3); // Example notification count
  const pathname = usePathname();

=======
  const [notifications, setNotifications] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();


>>>>>>> 9029510 (fixed things)
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownMenu) setDropdownMenu(false);
    };
<<<<<<< HEAD
    
=======

>>>>>>> 9029510 (fixed things)
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
<<<<<<< HEAD
    <header className="fixed left-0 top-0 w-full bg-white border-b border-gray-200 shadow-sm z-10 lg:pl-64">
=======
    <header className="fixed left-0 top-0 w-full bg-card border-b border-border shadow-sm z-10 lg:pl-64">
>>>>>>> 9029510 (fixed things)
      {/* Main TopBar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left section - Logo and menu for mobile */}
        <div className="flex items-center">
          <div className="lg:hidden mr-4">
<<<<<<< HEAD
            <button 
=======
            <button
>>>>>>> 9029510 (fixed things)
              onClick={(e) => {
                e.stopPropagation();
                setDropdownMenu(!dropdownMenu);
              }}
<<<<<<< HEAD
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
=======
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
>>>>>>> 9029510 (fixed things)
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
<<<<<<< HEAD
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-500" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {notifications}
=======
            <button className="p-2 rounded-full hover:bg-muted transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 group">
              <Bell className="h-5 w-5 text-secondary-foreground group-hover:text-primary transition-colors duration-200" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground shadow-lg animate-pulse border-2 border-background">
                  {notifications > 99 ? '99+' : notifications}
>>>>>>> 9029510 (fixed things)
                </span>
              )}
            </button>
          </div>
<<<<<<< HEAD
          
=======

>>>>>>> 9029510 (fixed things)
          {/* User profile */}
          <div className="border-l pl-4 ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
<<<<<<< HEAD
      
      {/* Mobile dropdown menu */}
      {dropdownMenu && (
        <div 
          className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-md z-30"
=======

      {/* Mobile dropdown menu */}
      {dropdownMenu && (
        <div
          className="lg:hidden absolute top-16 left-0 w-full bg-card border-b border-bordershadow-md z-30"
>>>>>>> 9029510 (fixed things)
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  href={link.url}
                  key={link.label}
<<<<<<< HEAD
                  className={`flex items-center px-3 py-3 rounded-md ${
                    isActive 
                      ? "bg-brown/10 text-brown font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`${isActive ? "text-brown" : "text-gray-500"} mr-3`}>
=======
                  className={`flex items-center px-3 py-3 rounded-md ${isActive
                    ? "bg-muted text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                    }`}
                >
                  <span className={`${isActive ? "text-primary" : "text-foreground"} mr-3`}>
>>>>>>> 9029510 (fixed things)
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