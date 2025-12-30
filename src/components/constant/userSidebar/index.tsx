"use client";
import { LuUser, LuX } from "react-icons/lu";
interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full border-l border-gray-200 shadow-lg shadow-gray-200 bg-white transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "w-full max-w-xs translate-x-0" : "w-0 max-w-0 translate-x-full"
        } overflow-hidden`}
      >
        {isOpen && (
          <div className="h-full flex flex-col w-full max-w-xs">
            {/* Header con botón cerrar */}
            <div className="w-full p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase">Perfil de Usuario</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-cyan-500 transition-all duration-300 p-2"
                aria-label="Cerrar sidebar"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del usuario */}
            <div className="flex-1 flex flex-col p-6">
              {/* Avatar y nombre */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200">
                <>
                    <div className="w-24 h-24  bg-cyan-100 flex items-center justify-center rounded-full">
                    <LuUser className="w-12 h-12 text-cyan-600" />
                    </div>
                </>
                <div className="text-center">
                  <h3 className="text-xs font-semibold uppercase">Usuario</h3>
                  <p className="text-sm text-gray-500">usuario@bekind.com</p>
                </div>
              </div>

            </div>
         
          </div>
        )}
      </div>
    </>
  );
}

