"use client";

import { useState } from "react";
import Navbar from "@/components/constant/navbar";
import Sidebar from "@/components/constant/sidebar";
import CategoriasView from "@/components/common/categorias";

function Content({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out p-20 ${isSidebarOpen ? "ml-0" : "ml-0"}`}>
      <CategoriasView />
    </div>
  );
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col"> 
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-row flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <Content isSidebarOpen={isSidebarOpen} />
        </div>
    </div>
  );
}

