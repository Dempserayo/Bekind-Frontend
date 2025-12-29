import RecoverPasswordCard from "@/components/common/card/recover_password";

export default function RecoverPassword() {
    return (
        <>
            <div className="w-full h-screen bg-white bg-cover bg-center flex justify-center items-center p-20" style={{ backgroundImage: "url('/fondo/Background.png')" }}> 
                <RecoverPasswordCard />
            </div>
        </>
    );
}

