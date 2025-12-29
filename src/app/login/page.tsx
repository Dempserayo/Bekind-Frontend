import type { Metadata } from "next";
import LoginCard from "@/components/common/card/login";

export const metadata: Metadata = {
  title: "Bekind | Login",
  description: "Bekind - Inicio de sesión",
};

export default function Login() {
  return (
    <>
        <div className="w-full h-screen bg-white bg-cover bg-center flex justify-center items-center p-20" style={{ backgroundImage: "url('/fondo/Background.png')" }}> 
            <LoginCard />
        </div>
    </>
  );
}
