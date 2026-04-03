"use client";
import {
  Search,
  Home,
  Users,
  Bell,
  MessageSquare,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[70px] border-b bg-white dark:bg-[#102031] flex items-center px-6 sticky top-0 z-50">
      <div className="container w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="Fullstacl Logo"
            width={140}
            height={24}
          />
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl px-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
            <Input
              placeholder="input search text"
              className="pl-12 h-11 bg-muted/40 border-none bg-[#F5F5F5] dark:bg-[#232E42] rounded-full focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2">
          {/* Icons Nav */}
          <nav className="flex items-center gap-1">
            <div className="p-3 border-b-2 border-blue-500 transition-colors">
              <Home className="w-6 h-6 text-blue-500" />
            </div>

            <button className="p-3 hover:bg-muted rounded-full transition-colors">
              <Users className="w-6 h-6 text-muted-foreground" />
            </button>

            <button className="p-3 hover:bg-muted rounded-full transition-colors relative">
              <Bell className="w-6 h-6 text-muted-foreground" />
              <span className="absolute top-2 right-2 bg-blue-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-background font-bold">
                6
              </span>
            </button>

            <button className="p-3 hover:bg-muted rounded-full transition-colors relative mr-4">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
              <span className="absolute top-2 right-2 bg-blue-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-background font-bold">
                2
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3 pl-4 cursor-pointer group">
            <Avatar className="h-9 w-9 border-2 border-blue-500/20 group-hover:border-blue-500 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold whitespace-nowrap">
                Dylan Field
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
