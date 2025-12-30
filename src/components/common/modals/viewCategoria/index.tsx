"use client";

import { LuX, LuPackageSearch } from "react-icons/lu";
import { CategoriaData } from "../../card/card_categorias";

interface ViewCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoria: CategoriaData | null;
}

export default function ViewCategoria({ isOpen, onClose, categoria }: ViewCategoriaProps) {
  if (!isOpen || !categoria) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full h-auto max-w-2xl bg-white shadow-xl shadow-white overflow-y-auto">
        {/* Header */}
        <>
          <div className="flex items-center justify-between p-10">
            <h2 className="text-sm font-semibold uppercase">Información de la Categoría</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
        </>
        {/* Body */}
        <>
          <div className="w-full h-full flex flex-col gap-4 px-10">
            {/* Nombre */}
            <>
                <div className="w-full h-auto flex flex-col ">
                <label className="block text-xs uppercase">
                    Nombre
                </label>
                <p className="text-xs">{categoria.nombre}</p>
                </div>
            </>
            {/* Descripción */}
            <>
                <div className="w-full h-auto flex flex-col">
              <label className="block text-xs uppercase">
                Descripción
              </label>
              <p className="text-xs whitespace-pre-wrap">
                {categoria.descripcion || "Sin descripción"}
              </p>
                </div>
            </>
            <>
                <div className="w-full h-auto flex flex-row gap-4">
                        {/* Logo e Icono */}
                        <div className="w-full h-auto flex flex-col">
                        <label className="block text-xs uppercase">
                            Icono
                        </label>
                        <div className="flex items-center gap-4">
                        {categoria.logoUrl ? (
                        <div className="flex items-center gap-3">
                            <img 
                            src={categoria.logoUrl} 
                            alt={categoria.nombre} 
                            className="w-12 h-12 object-contain border border-gray-200 rounded p-2"
                            />
                            <span className="text-xs text-gray-500">Imagen del icono</span>
                        </div>
                        ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded p-2">
                            <LuPackageSearch className="w-6 h-6 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-500">Sin icono asignado</span>
                        </div>
                        )}
                    </div>
                    </div>

                    {/* Color */}
                    <div className="w-full h-auto flex flex-col">
                    <label className="block text-xs uppercase">
                        Color
                    </label>
                    <div className="flex items-center gap-3">
                        <div 
                        className="w-12 h-12 border-2 border-gray-300 rounded"
                        style={{ backgroundColor: categoria.color }}
                        />
                        <span className="text-xs">{categoria.color}</span>
                    </div>
                    </div>
                </div>
            </>
            {/* Estado */}
            <>
                <div className="w-full h-auto flex flex-col">
                <label className="block text-xs uppercase">
                    Estado
                </label>
                <div className="flex items-center gap-3">
                    <span className={`text-xs ${
                    categoria.activo ? 'text-green-600' : 'text-gray-400'
                    }`}>
                    {categoria.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                    categoria.activo ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                </div>
                </div>
            </>
            {/* Fecha de Creación */}
            <>
                <div className="w-full h-auto flex flex-col">
                <label className="block text-xs uppercase">
                    Fecha de Creación
                </label>
                <p className="text-xs">{formatDate(categoria.fechaCreacion)}</p>
                </div>
            </>
            {/* ID */}
            <>
                <div className="w-full h-auto flex flex-col">
                <label className="block text-xs uppercase">
                    ID
                </label>
                <p className="text-xs font-mono">{categoria.id}</p>
                </div>
            </>
          </div>
        </>
        {/* Footer */}
        <>
          <div className="flex justify-end gap-4 p-10 ">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-xs"
            >
              Cerrar
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

