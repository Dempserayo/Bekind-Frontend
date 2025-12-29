import type { Metadata } from "next";
import RecoverPasswordCard from "@/components/common/card/recover_password";

export const metadata: Metadata = {
  title: "Bekind | Recuperar Contraseña",
  description: "Bekind - Recuperar contraseña",
};

export default function RecoverPassword() {
    return (
        <>
            <div className="w-full h-screen bg-white bg-cover bg-center flex justify-center items-center p-20" style={{ backgroundImage: "url('/fondo/Background.png')" }}> 
                <RecoverPasswordCard />
            </div>
        </>
    );
}

