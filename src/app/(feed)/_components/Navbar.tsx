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
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import { useLogout } from "@/hooks/Apicalling";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const user = session?.user as { firstName: string; lastName: string };
  const logoutMutation = useLogout(token);

  const handelLogOut = () => {
    logoutMutation.mutate()
    signOut({callbackUrl:"/login"})
  };
  
  return (
    <>
      <header className="h-[70px] bg-white dark:bg-[#112032] flex items-center px-4 md:px-6 sticky top-0 z-50">
        <div className="container w-full mx-auto flex items-center justify-between">
          <Image src="/images/logo.svg" alt="Logo" width={140} height={24} />

          <div className="hidden md:flex flex-1 max-w-xl px-10">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
              <Input
                placeholder="Search..."
                className="pl-12 h-11 bg-[#F5F5F5] dark:bg-[#232E42] border-none rounded-full"
              />
            </div>
          </div>

          {/* MOBILE SEARCH ICON */}
          <div className="md:hidden p-2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <Search className="w-6 h-6" />
          </div>

          {/* DESKTOP NAV ICONS */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              <div className="p-3 border-b-2 border-blue-500">
                <Home className="w-6 h-6 text-blue-500" />
              </div>

              <button className="p-3 hover:bg-muted rounded-full">
                <Users className="w-6 h-6 text-muted-foreground" />
              </button>

              <button className="p-3 hover:bg-muted rounded-full relative">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </button>

              <button className="p-3 hover:bg-muted rounded-full mr-4">
                <MessageSquare className="w-6 h-6 text-muted-foreground" />
              </button>

              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </nav>

            {/* PROFILE */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-4 cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {user?.firstName} {user?.lastName?.charAt(0)}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={handelLogOut}
                  className="cursor-pointer text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-white border-none dark:bg-[#112032] border-t flex items-center justify-around z-50">
        <Home className="w-6 h-6 text-blue-500" />

        <Users className="w-6 h-6 text-muted-foreground" />

        <Bell className="w-6 h-6 text-muted-foreground" />

        <MessageSquare className="w-6 h-6 text-muted-foreground" />

        <Avatar className="h-8 w-8">
          <AvatarImage src="/images/chat2_img.png" />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
