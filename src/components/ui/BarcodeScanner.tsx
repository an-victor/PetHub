import React from 'react';
import { useZxing } from 'react-zxing';

interface BarcodeScannerProps {
    onResult: (result: string) => void;
    onClose: () => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onResult, onClose }) => {
    const { ref } = useZxing({
        // @ts-ignore - Library types mismatch in some versions
        onDecodeResult(result) {
            onResult(result.getText());
        },
        onError(error) {
            // Quietly handle errors or log
        }
    });

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center animate-fadeIn">
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined">qr_code_scanner</span>
                    Escanear Lote
                </h3>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-3xl border-2 border-white/20">
                <video ref={ref} className="w-full h-full object-cover" />

                {/* Visual Guides */}
                <div className="absolute inset-0 border-[40px] border-black/50"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)] z-20"></div>
                <p className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-sm font-medium z-20">
                    Centralize o código de barras na linha vermelha
                </p>
            </div>

            <p className="text-white/60 text-xs mt-8 px-6 text-center">
                Funciona com códigos de barras padrão de vacinas e QR Codes.
            </p>
        </div>
    );
};
