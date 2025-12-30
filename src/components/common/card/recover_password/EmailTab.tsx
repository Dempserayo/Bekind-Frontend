import { LuMail } from "react-icons/lu";
import BackButton from "./BackButton";

interface EmailTabProps {
    onNext: () => void;
}

export default function EmailTab({ onNext }: EmailTabProps) {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center gap-4 px-10">
            <div className="w-full h-40 flex flex-col justify-center items-center gap-2">
                <span className="w-full flex flex-col justify-center items-start gap-2">
                    <p className="text-xs">Correo Electrónico*</p>
                    <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <LuMail className="w-4 h-4 text-blue-500" />
                        </div>
                        <input 
                            type="email" 
                            placeholder="Ingresar correo" 
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 text-xs focus:outline-none focus:ring-0 focus:border-blue-500" 
                        />
                    </div>
                </span>
            </div>
            
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <BackButton />
                <button 
                    type="button"
                    onClick={onNext}
                    className="w-full max-w-xs p-2 bg-blue-500 transition-all duration-300 hover:bg-blue-500 hover:animate-pulse cursor-pointer text-white"
                >
                    Enviar instrucciones
                </button>
            </div>
        </div>
    );
}

