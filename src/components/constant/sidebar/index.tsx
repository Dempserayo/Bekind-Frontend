"use client";

import { useState } from "react";
import Image from "next/image";
import { LuHouse, LuTrendingUp, LuUsers, LuDollarSign, LuShoppingCart, LuAward, LuCopyCheck , LuShapes, LuLogOut } from "react-icons/lu";

import { IconType } from "react-icons";
import Link from "next/link";
import ViewAlert from "@/components/common/modals/viewAlert";

interface SidebarProps {
  isOpen: boolean;
}

interface MenuOption {
  label: string;
  href: string;
  icon: IconType;
}

const menuOptions: MenuOption[] = [
  { label: "Home", href: "#", icon: LuHouse },
  { label: "Impacto Social", href: "#", icon: LuTrendingUp },
  { label: "Comunidad", href: "#", icon: LuUsers },
  { label: "Sponsors", href: "#", icon: LuDollarSign },
  { label: "Marketplace", href: "#", icon: LuShoppingCart },
  { label: "Bakanes", href: "#", icon: LuAward },
  { label: "Contenidos", href: "#", icon: LuCopyCheck },
  { label: "Categorias de acciones", href: "#", icon: LuShapes },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div
      className={`h-auto border-r border-gray-200 shadow-lg shadow-gray-200 bg-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-full max-w-md" : "w-0 max-w-0"
      } overflow-hidden`}
    >
      {isOpen && (
        <div className="h-full flex flex-col w-full max-w-xs">
            <>
            {/* logo ;)  */}
              <div className="w-full h-60 p-10 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/fondo/Background.png')" }}>
                <Image src="/logo/black/Union.png" alt="Bekind" width={150} height={150}  className="drop-shadow-xs drop-shadow-black"/>
              </div>
            </>
            <>
              {/* Navbar de opciones */}
                <div className="h-full flex flex-col p-4 ">
                    <nav className="flex flex-col gap-2 px-10">
                      {menuOptions.map((option, index) => {
                        const Icon = option.icon;
                        const isActive = activeIndex === index;
                        return (
                          <a 
                            key={index}
                            href={option.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveIndex(index);
                              setSelectedOption(option.label);
                              setIsAlertOpen(true);
                            }}
                            className={`relative flex items-center gap-3 p-3 rounded-md transition-all duration-300 text-xs ${
                              isActive 
                                ? "bg-cyan-50 text-gray-800" 
                                : "text-gray-700 hover:bg-cyan-500 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-r"></div>
                            )}
                            <Icon className="w-4 h-4" />
                            <span>{option.label}</span>
                          </a>
                        );
                      })}
                    </nav>
                </div>
            </>       
            <>
              {/* Cerrar sesión */}
              <div className="h-autop-4 border-t border-gray-200">
                <Link href="/login" className="flex items-center justify-start  gap-4 p-10">
                  <LuLogOut className="w-5 h-5" />
                  <span className="text-xs">Cerrar sesión</span>
                </Link>
              </div>
            </>   
        </div>
      )}
      <ViewAlert 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)}
        title={selectedOption}
        message={`La sección "${selectedOption}" estará disponible próximamente.`}
      />
    </div>
  );
}

