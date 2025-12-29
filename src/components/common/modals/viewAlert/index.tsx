"use client";

import { LuX } from "react-icons/lu";

interface ViewAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function ViewAlert({ isOpen, onClose, title = "Alerta" }: ViewAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
      <>
        <div className="w-full h-96 max-w-2xl bg-white rounded-md shadow-xl shadow-white overflow-y-auto px-10">
          {/* Header */}
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xs uppercase">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <LuX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </>
        </div>
      </>
    </div>
  );
}