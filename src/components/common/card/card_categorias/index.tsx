import { LuEye, LuPackageSearch, LuPencil, LuTrash } from "react-icons/lu";

export interface CategoriaData {
    id: string;
    nombre: string;
    descripcion: string;
    logo: File | null;
    logoUrl?: string;
    color: string;
    activo: boolean;
    fechaCreacion: string;
}

interface CardCategoriasProps {
    categoria: CategoriaData;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}

export default function CardCategorias({ categoria, onEdit, onDelete, onView }: CardCategoriasProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="w-full h-24 flex flex-col justify-center items-center hover:bg-white transition-all duration-300 cursor-pointer border border-gray-200">
             <>
                <div className="w-full flex flex-row justify-between items-center gap-4 text-xs">
                    {/* Nombre */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">{categoria.nombre}</p>
                        </span>
                    </>
                    {/* Icono */}
                    <>
                        <span className="w-auto  flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">
                            {categoria.logoUrl ? (
                                <img src={categoria.logoUrl} alt={categoria.nombre} className="w-4 h-4 object-contain" />
                            ) : (
                                <LuPackageSearch className="w-4 h-4" />
                            )}
                        </p>
                        </span>
                    </>
                    {/* Estado */}
                    <>
                        <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className={`w-full text-xs ${categoria.activo ? 'text-green-600' : 'text-gray-400'}`}>
                            {categoria.activo ? 'Activo' : 'Inactivo'}
                        </p>
                        </span>
                    </>
                    {/* Descripcion */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-20 text-xs truncate overflow-hidden" title={categoria.descripcion}>
                            {categoria.descripcion}
                        </p>
                        </span>
                    </>
                    {/* Fecha / creacion */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">{formatDate(categoria.fechaCreacion)}</p>
                        </span>
                    </>
                    {/* Acciones */}
                    <>
                        <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <button 
                            onClick={() => onEdit?.(categoria.id)}
                            className="hover:text-blue-500 cursor-pointer transition-all duration-300"
                        >
                            <LuPencil className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={() => onDelete?.(categoria.id)}
                            className="hover:text-blue-500 cursor-pointer transition-all duration-300"
                        >
                            <LuTrash className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={() => onView?.(categoria.id)}
                            className="hover:text-blue-500 cursor-pointer transition-all duration-300"
                        >
                            <LuEye className="w-3 h-3" />
                        </button>
                        </span>
                    </>
                </div>
              </>
        </div>
    );
}