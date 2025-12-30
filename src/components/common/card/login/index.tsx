"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeOff, LuLock, LuMail } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

const validationSchema = Yup.object({
  username: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida"),
});

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setError(null);
            try {
                const token = await authService.login({
                    username: values.username,
                    password: values.password,
                });
                
                // Guardar el token usando el contexto de autenticación
                login(token);
                
                // Redirigir a home
                router.push("/home");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al iniciar sesión");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="w-full max-w-xl h-[500px] border border-gray-200 bg-white/50 p-10 shadow-lg shadow-white flex flex-col justify-between items-center">
            {/* Bekind logo */}
            <>
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 ">
                    <Image src="/logo/black/Union.png" alt="Bekind" width={100} height={100}  className="drop-shadow-xs drop-shadow-black"/>
                    <span className="w-full h-auto text-xs text-gray-500 text-center flex flex-col justify-center items-center">
                        <p>¡Empieza a conectar</p>
                        <p>tu comunidad ante buenas acciones!</p>
                    </span>
                </div>
            </>
            {/* Formularios aqui jeje */}
            <>
                <form onSubmit={formik.handleSubmit} className="w-full h-full flex flex-col justify-between items-center gap-4 px-10">
                    <>
                        <div className="w-full h-40 flex flex-col justify-center items-center gap-2">
                            <span className="w-full flex flex-col justify-center items-start gap-2">
                                <p className="text-xs ">Correo Electrónico*</p>
                                <div className="relative w-full">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <LuMail className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="username"
                                        placeholder="Ingresar correo" 
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full pl-10 pr-3 py-3 border text-xs focus:outline-none focus:ring-0 ${
                                            formik.touched.username && formik.errors.username
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-blue-500"
                                        }`}
                                    />
                                </div>
                                {formik.touched.username && formik.errors.username && (
                                    <p className="text-xs text-red-500">{formik.errors.username}</p>
                                )}
                            </span>
                            <span className="w-full flex flex-col justify-center items-start gap-2">
                                <p className="text-xs ">Contraseña*</p>
                                <div className="relative w-full">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <LuLock className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <LuEyeOff className="w-4 h-4 text-blue-500" />
                                        ) : (
                                            <LuEye className="w-4 h-4 text-blue-500" />
                                        )}
                                    </button>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password"
                                        placeholder="Ingresa tu contraseña" 
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full pl-10 pr-10 py-3 bg-transparent border text-xs focus:outline-none focus:ring-0 ${
                                            formik.touched.password && formik.errors.password
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-blue-500"
                                        }`}
                                    />
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-xs text-red-500">{formik.errors.password}</p>
                                )}
                            </span>
                            {error && (
                                <div className="w-full mt-2">
                                    <p className="text-xs text-red-500 text-center">{error}</p>
                                </div>
                            )}
                        </div>
                    </>
                    <>
                        <div className="w-full h-full  flex flex-col justify-center items-center gap-4">
                            <button 
                                type="button"
                                onClick={() => router.push('/login/recoverpassword')}
                                className="text-xs text-center border-b p-2 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 cursor-pointer"
                            >
                                Recuperar contraseña
                            </button>
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full max-w-xs p-2 bg-blue-500 transition-all duration-300 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer text-white"
                            >
                                {isLoading ? "Ingresando..." : "Ingresar"}
                            </button>
                        </div>
                    </>
                </form>
            </>
        </div>
    );
}