"use client";

import { useState } from "react";
import { LuArrowUpDown, LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight, LuFilter } from "react-icons/lu";
import NewCategoria from "../modals/newCategoria";
import CardCategorias from "../card/card_categorias";

export default function Categorias() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full h-auto flex flex-col p-10 gap-4 bg-white">
            <>
              {/* Header */}
              <div className="w-full h-40 flex flex-col p-10 ">
                <p className="text-sm uppercase font-bold">Categorias</p>
                <div className="flex flex-row justify-between">
                  <>
                    <div className="flex flex-row gap-2 text-xs ">
                      <p className="w-auto border-b p-4 text-start hover:text-cyan-500 hover:border-cyan-500 cursor-pointer transition-all duration-300">Categorias</p>
                      <p className="w-auto border-b p-4 text-start hover:text-cyan-500 hover:border-cyan-500 cursor-pointer transition-all duration-300">Tipos</p>
                      <p className="w-auto border-b p-4 text-start hover:text-cyan-500 hover:border-cyan-500 cursor-pointer transition-all duration-300">Evidencias</p>
                    </div>
                  </>
                  <>
                    <div className="flex flex-row justify-end items-center gap-3 shrink-0 ">
                      <button className="shrink-0 transition-all duration-300 cursor-pointer text-xs hover:text-cyan-500 flex flex-row justify-center items-center p-3">
                        <LuFilter className="w-4 h-4" />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="shrink-0 w-48 px-4 py-3 text-xs border-b focus:outline-none focus:ring-2 focus:ring-transparent focus:border-cyan-500"
                      />
                      <button 
                        onClick={handleOpenModal} 
                        className="shrink-0 bg-[#1E1B4D] hover:bg-cyan-500 transition-all duration-300 cursor-pointer text-xs text-white flex flex-row justify-center items-center px-4 py-3  whitespace-nowrap"
                      >
                        Crear Categoria
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </>
            <>
              {/* Body */}
              <div className="w-full h-auto flex flex-col gap-4 p-10 ">
                <>
                  <div className="w-full flex flex-row justify-between items-start  text-xs ">
                      <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-gray-200 p-4">
                        <p className="w-full text-xs">Nombre</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-gray-200 p-4">
                        <p className="w-full text-xs">Icono</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-gray-200 p-4">
                        <p className="w-full text-xs">Estado</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-gray-200 p-4">
                        <p className="w-full text-xs">Descripcion</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-gray-200 p-4">
                        <p className="w-full text-xs">Fecha / creacion</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l border-r border-gray-200 p-4">
                        <p className="w-full text-xs">Acciones</p>
                        <button className=" hover:text-blue-500 cursor-pointer transition-all duration-300">
                          <LuArrowUpDown className="w-3 h-3" />
                        </button>
                      </span>
            
                  </div>
                </>
                <>
                  <div className="w-full flex flex-col">
                    <CardCategorias />
                    <CardCategorias />
                    <CardCategorias />
                    <CardCategorias />
                  </div>
                </>
              </div>
            </>
            <>
              {/* Footer */}
              <div className="w-full h-auto flex flex-row justify-between p-10 ">
                <>
                  <div className="w-full flex flex-row justify-start items-center gap-2 p-4 text-xs">
                    <p>Resultados por pagina</p>
                    <p>10 / 10</p>
                  </div>
                </>
                <>
                  <div className="w-full flex flex-row justify-start items-center gap-2 p-4 text-xs">
                    <p>1 - 10 de 40</p>
                  </div>
                </>
                <>
                  <div className="w-full flex flex-row justify-end items-center gap-2 p-4 text-sm ">
                    <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                      <LuChevronsLeft />
                    </button>
                    <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                      <LuChevronLeft />
                    </button>
                    <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                      <LuChevronRight />
                    </button>
                    <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                      <LuChevronsRight />
                    </button>
                  </div>
                </>
              </div>
            </>
            {/* Modal */}
            <NewCategoria isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}