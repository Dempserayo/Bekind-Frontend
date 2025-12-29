"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeOff, LuLock, LuMail } from "react-icons/lu";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className="w-full max-w-xl h-[500px] border border-gray-200 bg-white/50 rounded-2xl p-10 shadow-lg shadow-white flex flex-col justify-between items-center">
            {/* Bekind logo */}
            <>
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 ">
                    <Image src="/logo/Union.png" alt="Bekind" width={100} height={100}  className="drop-shadow-xs drop-shadow-black"/>
                    <span className="w-full h-auto text-xs text-gray-500 text-center flex flex-col justify-center items-center">
                        <p>¡Empieza a conectar</p>
                        <p>tu comunidad ante buenas acciones!</p>
                    </span>
                </div>
            </>
            {/* Formularios aqui jeje */}
            <>
                <div className="w-full h-full flex flex-col justify-between items-center gap-4 px-10">
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
                                        placeholder="Ingresar correo" 
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-0 focus:border-blue-500" 
                                    />
                                </div>
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
                                        placeholder="Ingresa tu contraseña" 
                                        className="w-full pl-10 pr-10 py-3 bg-transparent border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-0 focus:border-blue-500" 
                                    />
                                </div>
                            </span>
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
                                type="button"
                                onClick={() => router.push('/home')}
                                className="w-full max-w-xs p-2 bg-blue-500 transition-all duration-300 hover:bg-blue-500 hover:animate-pulse cursor-pointer text-white rounded-md"
                            >
                                Ingresar
                            </button>
                        </div>
                    </>
                </div>
            </>
        </div>
    );
}