import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    onClick?: () => void;
    label?: string;
}

export default function BackButton({ onClick, label = "Volver al inicio de sesión" }: BackButtonProps) {
    const router = useRouter();
    
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push('/login');
        }
    };

    return (
        <button 
            type="button"
            onClick={handleClick}
            className="text-xs text-center border-b p-2 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 cursor-pointer flex items-center gap-2"
        >
            <LuArrowLeft className="w-3 h-3" />
            {label}
        </button>
    );
}

