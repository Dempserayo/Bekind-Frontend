"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/constant/navbar";
import Sidebar from "@/components/constant/sidebar";
import UserSidebar from "@/components/constant/userSidebar";
import CategoriasView from "@/components/common/categorias";
import { useAuth } from "@/context/AuthContext";

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
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  // No mostrar nada si no está autenticado (el useEffect redirigirá)
  if (!isAuthenticated) {
    return null;
  }

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

