"use client";

import { useState, useMemo, useEffect } from "react";
import { LuArrowUpDown, LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight, LuFilter, LuX } from "react-icons/lu";
import NewCategoria, { CategoriaFormData } from "../modals/newCategoria";
import ViewCategoria from "../modals/viewCategoria";
import CardCategorias, { CategoriaData } from "../card/card_categorias";
import { categoriasService, ApiCategoriaResponse } from "@/services/categorias.service";

type SortField = 'nombre' | 'fechaCreacion' | 'estado' | null;
type SortDirection = 'asc' | 'desc';

export default function Categorias() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<CategoriaData | null>(null);
    const [categorias, setCategorias] = useState<CategoriaData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterEstado, setFilterEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);

    // Función para adaptar los datos de la API al formato CategoriaData
    const adaptApiDataToCategoriaData = (apiData: ApiCategoriaResponse): CategoriaData => {
        return {
            id: apiData.id || "",
            nombre: apiData.name || "",
            descripcion: apiData.description || "",
            logo: null, // El logo viene como URL desde la API, no como File
            logoUrl: apiData.iconUrl || apiData.icon || undefined,
            color: apiData.color || "#000000",
            activo: apiData.isActive !== undefined ? apiData.isActive : true,
            fechaCreacion: apiData.createdAt || apiData.createdDate || new Date().toISOString(),
        };
    };

    // Cargar categorías desde la API
    useEffect(() => {
        const loadCategorias = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiCategorias = await categoriasService.getCategorias(pageNumber, pageSize);
                const adaptedCategorias = apiCategorias.map(adaptApiDataToCategoriaData);
                setCategorias(adaptedCategorias);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al cargar las categorías");
                console.error("Error loading categorias:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategorias();
    }, [pageNumber, pageSize]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateCategoria = async () => {
        // La creación ya se hizo en el modal, aquí solo refrescamos el listado
        // Recargar las categorías desde la API para obtener los datos actualizados
        try {
            setIsLoading(true);
            setError(null);
            const apiCategorias = await categoriasService.getCategorias(pageNumber, pageSize);
            const adaptedCategorias = apiCategorias.map(adaptApiDataToCategoriaData);
            setCategorias(adaptedCategorias);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al refrescar las categorías");
            console.error("Error refreshing categorias:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCategoria = (id: string) => {
        // TODO: Implementar lógica de edición
        console.log("Editar categoría:", id);
    };

    const handleDeleteCategoria = (id: string) => {
        // Eliminar la categoría del estado
        setCategorias(categorias.filter(cat => cat.id !== id));
    };

    const handleViewCategoria = (id: string) => {
        const categoria = categorias.find(cat => cat.id === id);
        if (categoria) {
            setSelectedCategoria(categoria);
            setIsViewModalOpen(true);
        }
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedCategoria(null);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            // Si ya está ordenando por este campo, cambiar la dirección
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Si es un nuevo campo, ordenar ascendente
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Filtrar y ordenar categorías
    const filteredAndSortedCategorias = useMemo(() => {
        let filtered = [...categorias];

        // Aplicar búsqueda
        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(categoria =>
                categoria.nombre.toLowerCase().includes(term) ||
                categoria.descripcion.toLowerCase().includes(term)
            );
        }

        // Aplicar filtro de estado
        if (filterEstado !== 'todos') {
            filtered = filtered.filter(categoria =>
                filterEstado === 'activo' ? categoria.activo : !categoria.activo
            );
        }

        // Aplicar ordenamiento
        if (sortField) {
            filtered.sort((a, b) => {
                let comparison = 0;
                
                switch (sortField) {
                    case 'nombre':
                        comparison = a.nombre.localeCompare(b.nombre);
                        break;
                    case 'fechaCreacion':
                        comparison = new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime();
                        break;
                    case 'estado':
                        comparison = a.activo === b.activo ? 0 : a.activo ? 1 : -1;
                        break;
                }

                return sortDirection === 'asc' ? comparison : -comparison;
            });
        }

        return filtered;
    }, [categorias, searchTerm, filterEstado, sortField, sortDirection]);

    const handleToggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setFilterEstado('todos');
        setSortField(null);
        setSortDirection('asc');
    };

    // Configuración de columnas del header de la tabla
    const tableHeaders = [
        {
            label: 'Nombre',
            sortField: 'nombre' as SortField,
            width: 'w-full',
            isLast: false,
        },
        {
            label: 'Icono',
            sortField: null,
            width: 'w-auto',
            isLast: false,
        },
        {
            label: 'Estado',
            sortField: 'estado' as SortField,
            width: 'w-auto',
            isLast: false,
        },
        {
            label: 'Descripcion',
            sortField: null,
            width: 'w-full',
            isLast: false,
        },
        {
            label: 'Fecha / creacion',
            sortField: 'fechaCreacion' as SortField,
            width: 'w-full',
            isLast: false,
        },
        {
            label: 'Acciones',
            sortField: null,
            width: 'w-auto',
            isLast: true,
        },
    ];

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
                    <div className="flex flex-row justify-end items-center gap-3 shrink-0 relative"  >
                      <button 
                        onClick={handleToggleFilter}
                        className={`shrink-0 transition-all duration-300 cursor-pointer text-xs flex flex-row justify-center items-center p-3 ${
                          isFilterOpen || filterEstado !== 'todos' || searchTerm !== "" 
                            ? 'text-cyan-500' 
                            : 'hover:text-cyan-500'
                        }`}
                      >
                        <LuFilter className="w-4 h-4" />
                      </button>
                      {/* Panel de filtros */}
                      {isFilterOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-10 min-w-[200px]">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold">Filtros</h3>
                            <button
                              onClick={handleToggleFilter}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <LuX className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium mb-2">Estado</label>
                              <select
                                value={filterEstado}
                                onChange={(e) => setFilterEstado(e.target.value as 'todos' | 'activo' | 'inactivo')}
                                className="w-full px-3 py-2 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                              >
                                <option value="todos">Todos</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                              </select>
                            </div>
                            <button
                              onClick={handleClearFilters}
                              className="w-full px-3 py-2 text-xs border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              Limpiar filtros
                            </button>
                          </div>
                        </div>
                      )}
                      <input 
                        type="text" 
                        placeholder="Buscar..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                      {tableHeaders.map((header, index) => (
                        <span
                          key={index}
                          className={`${header.width} flex flex-row justify-between items-center gap-2 transition-all duration-300 cursor-pointer border-t border-b border-l ${header.isLast ? 'border-r' : ''} border-gray-200 p-4`}
                          onClick={header.sortField ? () => handleSort(header.sortField) : undefined}
                        >
                          <p className="w-full text-xs">{header.label}</p>
                          <button
                            onClick={header.sortField ? (e) => {
                              e.stopPropagation();
                              handleSort(header.sortField);
                            } : undefined}
                            className={`hover:text-blue-500 transition-all duration-300 ${
                              header.sortField
                                ? `cursor-pointer ${sortField === header.sortField ? 'text-blue-500' : ''}`
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!header.sortField}
                          >
                            <LuArrowUpDown className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                </>
                <>
                  <div className="w-full flex flex-col">
                    {filteredAndSortedCategorias.length > 0 ? (
                      filteredAndSortedCategorias.map((categoria) => (
                        <CardCategorias
                          key={categoria.id}
                          categoria={categoria}
                          onEdit={handleEditCategoria}
                          onDelete={handleDeleteCategoria}
                          onView={handleViewCategoria}
                        />
                      ))
                    ) : categorias.length > 0 ? (
                      <div className="w-full h-24 flex items-center justify-center text-xs text-gray-400 border border-gray-200">
                        <p>No se encontraron categorías que coincidan con los filtros aplicados.</p>
                      </div>
                    ) : (
                      <div className="w-full h-24 flex items-center justify-center text-xs text-gray-400 border border-gray-200">
                        <p>No hay categorías creadas. Crea una nueva categoría para comenzar.</p>
                      </div>
                    )}
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
                    <p>{filteredAndSortedCategorias.length} / {filteredAndSortedCategorias.length}</p>
                  </div>
                </>
                <>
                  <div className="w-full flex flex-row justify-start items-center gap-2 p-4 text-xs">
                    <p>{filteredAndSortedCategorias.length > 0 ? `1 - ${filteredAndSortedCategorias.length}` : '0'} de {categorias.length}</p>
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
            {/* Modals */}
            <NewCategoria isOpen={isModalOpen} onClose={handleCloseModal} onCreate={handleCreateCategoria} />
            <ViewCategoria isOpen={isViewModalOpen} onClose={handleCloseViewModal} categoria={selectedCategoria} />
        </div>
    );
}