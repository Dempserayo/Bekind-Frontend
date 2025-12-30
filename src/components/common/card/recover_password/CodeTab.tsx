import BackButton from "./BackButton";

interface CodeTabProps {
    otp: string[];
    otpLength: number;
    onOtpChange: (index: number, value: string) => void;
    onOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
    onOtpPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    onBack: () => void;
}

export default function CodeTab({ 
    otp, 
    otpLength, 
    onOtpChange, 
    onOtpKeyDown, 
    onOtpPaste,
    onBack 
}: CodeTabProps) {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center gap-4 px-10">
            <div className="w-full h-40 flex flex-col justify-center items-center gap-2">
                <span className="w-full flex flex-col justify-center items-start gap-2">
                    <div className="w-full flex justify-center items-center gap-2">
                        {otp.slice(0, otpLength).map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => onOtpChange(index, e.target.value)}
                                onKeyDown={(e) => onOtpKeyDown(index, e)}
                                onPaste={onOtpPaste}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            />
                        ))}
                    </div>
                </span>
            </div>
            
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <BackButton onClick={onBack} />
                <button 
                    type="submit" 
                    className="w-full max-w-xs p-2 bg-blue-500 transition-all duration-300 hover:bg-blue-500 hover:animate-pulse cursor-pointer text-white"
                >
                    Verificar código
                </button>
            </div>
        </div>
    );
}

