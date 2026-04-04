import React from "react";
import Navbar from "./_components/Navbar";
import { ThemeProvider } from "next-themes";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#F0F2F5] dark:bg-[#232E42] fixed inset-0">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default layout;
