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
      <div className="w-full h-auto max-w-4xl bg-white rounded-md shadow-xl shadow-white overflow-y-auto px-10">
        {/* Header */}
        <>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Crear categoria</h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar"
            >
                <LuX className="w-5 h-5 text-gray-500" />
            </button>
            </div>
        </>
        {/* Form */}
        <>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nombre de la categoria */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la categoria <span className="text-red-500">*</span>
                </label>
                <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe el nombre de la buena acción"
                className="w-full h-10border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                />
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    required
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {descripcionLength}/{maxDescripcionLength}
                </div>
                </div>
            </div>

            {/* Logo */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <span className="text-gray-500">
                    {logoFileName || "Carga archivo"}
                    </span>
                    <LuUpload className="w-5 h-5 text-gray-400" />
                </label>
                </div>
            </div>

            {/* Color */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Color <span className="text-red-500">*</span>
                </label>
                <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Registra color codigo HEX"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                />
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
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors font-medium"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className={`px-6 py-2 rounded-md transition-colors font-medium ${
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
