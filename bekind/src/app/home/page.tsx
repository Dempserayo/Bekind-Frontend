"use client";

import { useState } from "react";
import Navbar from "@/components/constant/navbar";
import Sidebar from "@/components/constant/sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-auto bg-white flex flex-col"> 
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="w-full h-auto flex flex-roW">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="w-full h-auto bg-white">
        </div>

        </div>
    </div>
  );
}

