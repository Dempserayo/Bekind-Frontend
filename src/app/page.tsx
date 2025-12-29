import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bekind | Inicio",
  description: "Bekind - Inicio",
};

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex flex-row justify-end items-center bg-white bg-cover bg-center" style={{ backgroundImage: "url('/fondo/Background.png')" }}> 
          <>
            <div className="w-full max-w-4xl h-full bg-white border-l border-gray-200 shadow-lg shadow-white flex flex-col justify-center items-center gap-10">
                <>
                  <div className="w-full h-auto flex flex-col justify-center items-center gap-4 ">
                        <Image src="/logo/Union.png" alt="Bekind" width={100} height={100}  className="drop-shadow-xs drop-shadow-black"/>
                        <span className="w-full h-auto text-xs text-gray-500 text-center flex flex-col justify-center items-center">
                            <p>¡Empieza a conectar</p>
                            <p>tu comunidad ante buenas acciones!</p>
                        </span>
                  </div>
                </>
                <>
                  <div className="w-full h-auto  flex flex-col justify-center items-center gap-4">
                    <Link href={'/login'} className="text-xs text-center border-b p-2 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 cursor-pointer">
                      <p>Ya tengo una cuenta</p> 
                    </Link>
                  </div>
                </>
            </div>
          </>
      </div>
    </>
  );
}
