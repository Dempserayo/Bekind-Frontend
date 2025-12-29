"use client";

import { LuX } from "react-icons/lu";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={`h-screen border-r bg-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-full max-w-xs" : "w-0 max-w-0"
      } overflow-hidden`}
    >
      {isOpen && (
        <div className="h-full flex flex-col w-full max-w-xs">
          {/* Header del Sidebar con botón de toggle */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
              aria-label="Cerrar sidebar"
            >
              <LuX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Contenido del Sidebar */}
          <div className="flex-1 p-4 overflow-y-auto">
            <nav className="space-y-2">
              <a href="#" className="block p-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-700">
                Opción 1
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-700">
                Opción 2
              </a>
              <a href="#" className="block p-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-700">
                Opción 3
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

