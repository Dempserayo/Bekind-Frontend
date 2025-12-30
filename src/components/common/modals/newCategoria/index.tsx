"use client";

import { useState } from "react";
import { LuX, LuUpload } from "react-icons/lu";

interface NewCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewCategoria({ isOpen, onClose }: NewCategoriaProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [color, setColor] = useState("");
  const [activo, setActivo] = useState(true);
  const [logoFileName, setLogoFileName] = useState("");

  const maxDescripcionLength = 200;
  const descripcionLength = descripcion.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear la categoría
    console.log({ nombre, descripcion, logo, color, activo });
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setNombre("");
    setDescripcion("");
    setLogo(null);
    setLogoFileName("");
    setColor("");
    setActivo(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" bg-gray-900/50 backdrop-blur-sm  fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full h-auto max-w-4xl bg-white  shadow-xl shadow-white overflow-y-auto px-10">
        {/* Header */}
        <>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold uppercase">Crear categoria</h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar"
            >
                <LuX className="w-4 h-4" />
            </button>
            </div>
        </>
        {/* Form */}
        <>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nombre de la categoria */}
            <div className="w-full h-auto flex flex-col gap-4">
                <label className="block text-sm font-medium">
                Nombre de la categoria <span className="text-red-500">*</span>
                </label>
                <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe el nombre de la buena acción"
                className="w-full h-10 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4"
                required
                />
            </div>

            {/* Descripción */}
            <div className="w-full h-auto flex flex-col gap-4">
                <label className="block text-sm font-medium ">
                Descripción de la buena acción <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <textarea
                    value={descripcion}
                    onChange={(e) => {
                    if (e.target.value.length <= maxDescripcionLength) {
                        setDescripcion(e.target.value);
                    }
                    }}
                    placeholder="Agregar descripción"
                    rows={4}
                    className="w-full px-4 py-2 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y p-4"
                    required
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {descripcionLength}/{maxDescripcionLength}
                </div>
                </div>
            </div>

            <div className="w-full h-auto flex flex-row gap-4">
                {/* Logo */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <label className="block text-sm font-medium">
                    Logo <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                    <input
                        type="file"
                        id="logo-upload"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <label
                        htmlFor="logo-upload"
                        className="flex items-center justify-between w-full px-4 py-2 text-xs border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <span>
                            {logoFileName || "Cargar archivo"}
                        </span>
                        <LuUpload className="w-3 h-3" />
                    </label>
                    </div>
                </div>

                {/* Color */}
                <div className="w-full h-auto flex flex-col gap-2">
                    <label className="block text-sm font-medium">
                    Color <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Registra color codigo HEX"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    className="w-full px-4 py-2 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4"
                    required
                    />
                </div>
            </div>

            {/* Activo Toggle */}
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                Activo
                </label>
                <button
                type="button"
                onClick={() => setActivo(!activo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    activo ? "bg-teal-500" : "bg-gray-300"
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    activo ? "translate-x-6" : "translate-x-1"
                    }`}
                />
                </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 border-gray-200">
                <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 transition-colors font-medium text-xs"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className={`px-6 py-2 transition-colors font-medium text-xs ${
                    nombre && descripcion && logo && color
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!nombre || !descripcion || !logo || !color}
                >
                Crear
                </button>
            </div>
            </form>
        </>
      </div>
    </div>
  );
}
