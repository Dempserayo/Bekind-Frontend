import Image from "next/image";

interface HeaderProps {
    activeTab: 'email' | 'code';
}

export default function Header({ activeTab }: HeaderProps) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <Image 
                src="/logo/Union.png" 
                alt="Bekind" 
                width={100} 
                height={100} 
                className="drop-shadow-xs drop-shadow-black"
            />
            <span className="w-full h-auto text-xs text-gray-500 text-center flex flex-col justify-center items-center">
                {activeTab === 'email' ? (
                    <>
                        <p>Recupera tu contraseña</p>
                        <p>Ingresa tu correo electrónico para recibir instrucciones</p>
                    </>
                ) : (
                    <>
                        <p>Verifica tu código</p>
                        <p>Ingresa el código que recibiste en tu correo electrónico</p>
                    </>
                )}
            </span>
        </div>
    );
}

