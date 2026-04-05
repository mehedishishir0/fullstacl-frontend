import React from "react";
import SidebarLeft from "./_components/SidebarLeft";
import SidebarRight from "./_components/SidebarRight";
import Feed from "./_components/Feed";

const Page = () => {
  return (
    <div className="flex container mt- h-screen w-full   overflow-hidden  inset-0">
      {/* Left Sidebar */}
      <aside className="w-[350px]  h-full no-scrollbar overflow-y-auto hidden lg:block">
        <SidebarLeft />
      </aside>

      {/* Feed */}
      <main className="flex-1 h-full no-scrollbar overflow-y-auto">
        <div className="max-w-[700px] mx-auto py-6 ">
          <Feed />
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[350px]  h-full no-scrollbar overflow-y-auto hidden xl:block">
        <SidebarRight />
      </aside>
    </div>
  );
};

export default Page;
