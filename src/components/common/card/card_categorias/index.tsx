import { LuEye, LuPackageSearch, LuPencil, LuTrash } from "react-icons/lu";

export default function CardCategorias() {
    return (
        <div className="w-full h-24 flex flex-col justify-center items-center hover:bg-white transition-all duration-300 cursor-pointer border border-gray-200">
             <>
                <div className="w-full flex flex-row justify-between items-center gap-4 text-xs">
                    {/* Nombre */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">Nombre</p>
                        </span>
                    </>
                    {/* Icono */}
                    <>
                        <span className="w-auto  flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">
                            <LuPackageSearch className="w-4 h-4" />
                        </p>
                        </span>
                    </>
                    {/* Estado */}
                    <>
                        <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">Estado</p>
                        </span>
                    </>
                    {/* Descripcion */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">Descripcion</p>
                        </span>
                    </>
                    {/* Fecha / creacion */}
                    <>
                        <span className="w-full flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <p className="w-full text-xs">Abr 3, 2024</p>
                        </span>
                    </>
                    {/* Acciones */}
                    <>
                        <span className="w-auto flex flex-row justify-between items-center gap-2 transition-all duration-300 p-4">
                        <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                            <LuPencil className="w-3 h-3" />
                        </button>
                        <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                            <LuTrash className="w-3 h-3" />
                        </button>
                        <button className="hover:text-blue-500 cursor-pointer transition-all duration-300">
                            <LuEye className="w-3 h-3" />
                        </button>
                        </span>
                    </>
                </div>
              </>
        </div>
    );
}