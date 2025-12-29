"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-xl h-[500px] border border-gray-200 bg-white rounded-2xl p-10 shadow-lg shadow-white flex flex-col justify-between items-center">
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
                <div className="w-full h-full flex flex-col justify-between items-center gap-4">
                    <>
                        <div className="w-full h-40 flex flex-col justify-center items-center gap-2">
                            <span className="w-full flex flex-col justify-center items-start gap-2">
                                <p className="text-xs ">Correo Electrónico*</p>
                                <div className="relative w-full">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.66667 3.33333C2.29848 3.33333 2 3.63181 2 4V12C2 12.3682 2.29848 12.6667 2.66667 12.6667H13.3333C13.7015 12.6667 14 12.3682 14 12V4C14 3.63181 13.7015 3.33333 13.3333 3.33333H2.66667ZM3.33333 4.66667L8 7.83333L12.6667 4.66667V11.3333H3.33333V4.66667ZM3.33333 4L8 7.16667L12.6667 4H3.33333Z" fill="#9CA3AF"/>
                                        </svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Ingresar correo" 
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-xs" 
                                    />
                                </div>
                            </span>
                            <span className="w-full flex flex-col justify-center items-start gap-2">
                                <p className="text-xs ">Contraseña*</p>
                                <div className="relative w-full">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 1.33333C6.15905 1.33333 4.66667 2.82571 4.66667 4.66667V6.66667H3.33333C2.96514 6.66667 2.66667 6.96514 2.66667 7.33333V13.3333C2.66667 13.7015 2.96514 14 3.33333 14H12.6667C13.0349 14 13.3333 13.7015 13.3333 13.3333V7.33333C13.3333 6.96514 13.0349 6.66667 12.6667 6.66667H11.3333V4.66667C11.3333 2.82571 9.84095 1.33333 8 1.33333ZM8 2.66667C9.10457 2.66667 10 3.5621 10 4.66667V6.66667H6V4.66667C6 3.5621 6.89543 2.66667 8 2.66667ZM3.33333 7.33333H12.6667V13.3333H3.33333V7.33333Z" fill="#9CA3AF"/>
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 2.66667C11.3333 2.66667 13.6667 6 13.6667 8C13.6667 8.66667 13.3333 9.66667 12.6667 10.6667L14 12L12.6667 13.3333L11.3333 12C10.3333 12.6667 9.33333 13 8.66667 13H8C4.66667 13 2.33333 9.66667 2.33333 8C2.33333 7.33333 2.66667 6.33333 3.33333 5.33333L2 4L3.33333 2.66667L4.66667 4C5.66667 3.33333 6.66667 3 7.33333 3H8V2.66667ZM8 4.66667C6.15905 4.66667 4.66667 6.15905 4.66667 8C4.66667 9.84095 6.15905 11.3333 8 11.3333C9.84095 11.3333 11.3333 9.84095 11.3333 8C11.3333 6.15905 9.84095 4.66667 8 4.66667ZM8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="#9CA3AF"/>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 2.66667C11.3333 2.66667 13.6667 6 13.6667 8C13.6667 8.66667 13.3333 9.66667 12.6667 10.6667L14 12L12.6667 13.3333L11.3333 12C10.3333 12.6667 9.33333 13 8.66667 13H8C4.66667 13 2.33333 9.66667 2.33333 8C2.33333 7.33333 2.66667 6.33333 3.33333 5.33333L2 4L3.33333 2.66667L4.66667 4C5.66667 3.33333 6.66667 3 7.33333 3H8V2.66667ZM8 4.66667C6.15905 4.66667 4.66667 6.15905 4.66667 8C4.66667 9.84095 6.15905 11.3333 8 11.3333C9.84095 11.3333 11.3333 9.84095 11.3333 8C11.3333 6.15905 9.84095 4.66667 8 4.66667ZM8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="#9CA3AF"/>
                                                <path d="M2 2L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        )}
                                    </button>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Ingresa tu contraseña" 
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-xs" 
                                    />
                                </div>
                            </span>
                        </div>
                    </>
                    <>
                        <div className="w-full h-full  flex flex-col justify-center items-center gap-4">
                            <p className="text-xs  text-center border-b p-2 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 cursor-pointer">Recuperar contraseña</p>
                            <button type="submit" className="w-full max-w-xs p-2 bg-blue-500 text-white rounded-md">Ingresar</button>
                        </div>
                    </>
                </div>
            </>
        </div>
    );
}