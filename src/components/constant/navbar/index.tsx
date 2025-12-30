"use client";

import Image from "next/image";
import { LuSettings, LuUser, LuMenu, LuX, LuBell } from "react-icons/lu";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onToggleUserSidebar: () => void;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen, onToggleUserSidebar }: NavbarProps) {
    return (
        <div className="w-full h-24 bg-[#1E1B4D] flex justify-between items-center p-10">
            <div className="w-full flex flex-row justify-between items-center">
                <>
                    {/* Logo y toggle sidebar */}
                    <div className="flex flex-row items-center gap-4">
                        <button
                            onClick={onToggleSidebar}
                            className="text-white hover:text-cyan-500 transition-all duration-300 p-2"
                            aria-label="Toggle sidebar"
                        >
                            {isSidebarOpen ? (
                                <LuX className="w-6 h-6" />
                            ) : (
                                <LuMenu className="w-6 h-6" />
                            )}
                        </button>
                            <Image src="/logo/white/Union.png" alt="Bekind" width={100} height={100}  className="drop-shadow-xs drop-shadow-white"/>
                    </div>
                </>
                <>
                    {/* Titulo y descripcion */}
                    <span className="w-auto flex flex-row justify-center items-center gap-4">
                        <p className="text-white text-xs">Bekind</p>
                        <p className="text-white text-xs">¡Empieza a conectar</p>
                        <p className="text-white text-xs">tu comunidad ante buenas acciones!</p>
                    </span>
                </>
                <>
                    {/* Botones de configuracion y usuario */}
                    <div className="flex flex-row justify-center items-center gap-4">
                        <button className="text-white text-xs hover:text-cyan-500 transition-all duration-300 cursor-pointer">
                            <LuBell className="w-4 h-4 " />
                        </button>
                        <button className="text-white text-xs hover:text-cyan-500 transition-all duration-300 cursor-pointer">
                            <LuSettings className="w-4 h-4 " />
                        </button>
                        <button 
                            onClick={onToggleUserSidebar}
                            className="bg-white text-xs rounded-full  p-4 hover:bg-cyan-500 hover:text-white transition-all duration-300 cursor-pointer"
                            aria-label="Toggle user sidebar"
                        >
                            <LuUser className="w-4 h-4 " />
                        </button>
                    </div>
                </>
            </div>
        </div >
    );
}