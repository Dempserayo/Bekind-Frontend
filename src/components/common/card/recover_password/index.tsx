"use client";

import { useState } from "react";
import Header from "./Header";
import EmailTab from "./EmailTab";
import CodeTab from "./CodeTab";

export default function RecoverPasswordCard() {
    const [activeTab, setActiveTab] = useState<'email' | 'code'>('email');
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const otpLength = 4;

    const handleOtpChange = (index: number, value: string) => {
        // Solo permitir números
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Mover al siguiente input si se ingresó un dígito
        if (value && index < otpLength - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Si se presiona backspace y el input está vacío, volver al anterior
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, otpLength);
        const pastedArray = pastedData.split('').filter(char => /^\d$/.test(char));
        
        if (pastedArray.length > 0) {
            const newOtp = [...otp];
            pastedArray.forEach((digit, i) => {
                if (i < otpLength) {
                    newOtp[i] = digit;
                }
            });
            setOtp(newOtp);
            
            // Mover el foco al último input con valor o al siguiente vacío
            const nextEmptyIndex = newOtp.findIndex((val, idx) => idx >= pastedArray.length && val === '');
            const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(pastedArray.length, otpLength - 1);
            const nextInput = document.getElementById(`otp-${focusIndex}`);
            nextInput?.focus();
        }
    };

    const handleNextToCode = () => {
        setActiveTab('code');
    };

    const handleBackToEmail = () => {
        setActiveTab('email');
        setOtp(['', '', '', '', '', '']);
    };

    return (
        <div className="w-full max-w-xl h-[500px] border border-gray-200 bg-white/50 rounded-2xl p-10 shadow-lg shadow-white flex flex-col justify-between items-center">
            <Header activeTab={activeTab} />
            
            {activeTab === 'email' ? (
                <EmailTab onNext={handleNextToCode} />
            ) : (
                <CodeTab
                    otp={otp}
                    otpLength={otpLength}
                    onOtpChange={handleOtpChange}
                    onOtpKeyDown={handleOtpKeyDown}
                    onOtpPaste={handleOtpPaste}
                    onBack={handleBackToEmail}
                />
            )}
        </div>
    );
}
