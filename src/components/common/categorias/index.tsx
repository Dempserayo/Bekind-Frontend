"use client";

import { useState } from "react";
import { LuSearch, LuFilter, LuPencil, LuTrash2, LuEye, LuChevronUp, LuChevronDown, LuChevronsLeft, LuChevronLeft, LuChevronRight, LuChevronsRight } from "react-icons/lu";
import NewCategoria from "@/components/common/modals/newCategoria";

interface SortIconProps {
  column: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
}

function SortIcon({ column, sortColumn, sortDirection }: SortIconProps) {
  if (sortColumn !== column) {
    return (
      <span className="flex flex-col">
        <LuChevronUp className="w-3 h-3 text-white" />
        <LuChevronDown className="w-3 h-3 text-white" />
      </span>
    );
  }
  return sortDirection === "asc" ? (
    <LuChevronUp className="w-3 h-3 text-white" />
  ) : (
    <LuChevronDown className="w-3 h-3 text-white" />
  );
}

interface Category {
  id: number;
  nombre: string;
  icono: string;
  estado: string;
  descripcion: string;
  fechaCreacion: string;
}

export default function CategoriasView() {
  const [activeTab, setActiveTab] = useState("Categorias");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Categorias", "Tipos", "Evidencias"];

  const categories: Category[] = [
    {
      id: 1,
      nombre: "Foto + Descripción",
      icono: "📷",
      estado: "Activo",
      descripcion: "Realizar actividad física al menos 30 minutos cada día",
      fechaCreacion: "Abr 3, 2024"
    },
    {
      id: 2,
      nombre: "Foto + Descripción",
      icono: "📷",
      estado: "Activo",
      descripcion: "Realizar actividad física al menos 30 minutos cada día",
      fechaCreacion: "Abr 3, 2024"
    }
  ];

  const totalItems = 40;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg p-10">
        {/* Título */}
        {/* Tabs de navegación */}
        <>
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-gray-800 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </>
        {/* Barra de búsqueda y acciones */}
        <>
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <LuFilter className="w-4 h-4" />
                <span className="text-sm">Filtros</span>
              </button>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Crear tipo de categoria
            </button>
          </div>
        </>
        {/* Tabla */}
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <>
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <>
                          <th
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("nombre")}
                          >
                            <div className="flex items-center gap-2">
                              Nombre
                              <SortIcon column="nombre" sortColumn={sortColumn} sortDirection={sortDirection} />
                            </div>
                          </th>
                        </>
                        <>
                          <th
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("icono")}
                          >
                            <div className="flex items-center gap-2">
                              Icono
                              <SortIcon column="icono" sortColumn={sortColumn} sortDirection={sortDirection} />
                            </div>
                          </th>
                        </>
                        <>
                          <th
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("estado")}
                          >
                            <div className="flex items-center gap-2">
                              Estado
                              <SortIcon column="estado" sortColumn={sortColumn} sortDirection={sortDirection} />
                            </div>
                          </th>
                        </>
                        <>
                          <th
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("descripcion")}
                          >
                            <div className="flex items-center gap-2">
                              Descripción
                              <SortIcon column="descripcion" sortColumn={sortColumn} sortDirection={sortDirection} />
                            </div>
                          </th>
                        </>
                        <>
                          <th
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("fechaCreacion")}
                          >
                            <div className="flex items-center gap-2">
                              Fecha de creación
                              <SortIcon column="fechaCreacion" sortColumn={sortColumn} sortDirection={sortDirection} />
                            </div>
                          </th>
                        </>
                        <>
                          <th className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Acciones
                          </th>
                        </>
                      </tr>
                    </thead>
                  </>
                  <>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {category.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-8 h-8 bg-pink-200 rounded flex items-center justify-center text-lg">
                              {category.icono}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              {category.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                            {category.descripcion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.fechaCreacion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                <LuPencil className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                <LuTrash2 className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                <LuEye className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                </table>
              </div>
            </>

            {/* Paginación */}
            <>
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Resultados por página</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <LuChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <LuChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <LuChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <LuChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </>

        {/* Modal */}
        <NewCategoria isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

