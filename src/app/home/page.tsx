"use client";

import { useState } from "react";
import Navbar from "@/components/constant/navbar";
import Sidebar from "@/components/constant/sidebar";
import UserSidebar from "@/components/constant/userSidebar";
import CategoriasView from "@/components/common/categorias";

function Content({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out  ${isSidebarOpen ? "ml-0" : "ml-0"}`}>
      <CategoriasView />
    </div>
  );
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
  };

  return (
    <div className="w-full h-full  flex flex-col"> 
        <Navbar 
          onToggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          onToggleUserSidebar={toggleUserSidebar}
        />
        <div className="flex flex-row flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <Content isSidebarOpen={isSidebarOpen} />
        </div>
        <UserSidebar isOpen={isUserSidebarOpen} onClose={() => setIsUserSidebarOpen(false)} />
    </div>
  );
}

