import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';

// Mock types for build
type MobileNet = any;


// A simple translation map for common results to Portuguese
const TRANSLATIONS: Record<string, string> = {
    'golden retriever': 'Golden Retriever',
    'labrador retriever': 'Labrador',
    'german shepherd': 'Pastor Alemão',
    'beagle': 'Beagle',
    'pembroke': 'Corgi',
    'chihuahua': 'Chihuahua',
    'siamese': 'Gato Siamês',
    'tabby': 'Gato Tigrado',
    'persian': 'Gato Persa',
    'egyptian cat': 'Gato Egípcio',
    'boxer': 'Boxer',
    'pug': 'Pug',
    'rottweiler': 'Rottweiler',
    'poodle': 'Poodle',
    'french bulldog': 'Buldogue Francês',
    'yorkshire terrier': 'Yorkshire',
    'dalmatian': 'Dálmata',
    'husky': 'Husky Siberiano'
};

const BreedScanner: React.FC = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [model, setModel] = useState<MobileNet | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [predictions, setPredictions] = useState<{ className: string; probability: number }[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraError, setCameraError] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    // Load ModelMOCKED
    useEffect(() => {
        const loadModel = async () => {
            // Mock loading
            setTimeout(() => {
                setModel({ classify: async () => [] } as any);
                setIsModelLoading(false);
            }, 1000);
        };
        loadModel();

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // Use back camera on mobile
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setIsScanning(true);
            setCameraError('');
        } catch (err) {
            console.error("Camera Error:", err);
            setCameraError('Não foi possível acessar a câmera. Verifique as permissões.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsScanning(false);
        }
    };

    const captureAndAnalyze = async () => {
        if (!videoRef.current) return;

        setAnalyzing(true);

        // Wait a small delay for visual effect
        // Analyze frame
        try {
            // Mock Prediction
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockPredictions = [
                { className: 'golden retriever', probability: 0.95 },
                { className: 'labrador retriever', probability: 0.03 },
                { className: 'beagle', probability: 0.01 }
            ];
            setPredictions(mockPredictions);
        } catch (err) {
            console.error("Classification error:", err);
        } finally {
            setAnalyzing(false);
            stopCamera(); // Freeze/Stop after capture
        }
    };

    const reset = () => {
        setPredictions([]);
        startCamera();
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 p-5 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold tracking-widest uppercase text-primary">Pet Vision AI</span>
                    <h1 className="text-xs text-white/70">Identificador de Raças</h1>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex flex-col justify-center items-center bg-gray-900">

                {/* Camera Viewport */}
                {isScanning && !predictions.length ? (
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }} // Mirror effect if front camera, can toggle
                        />
                        {/* Scanning Overlay (Scanner Line) */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            <div className="w-full h-full border-[30px] border-black/50 relative">
                                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-primary shadow-[0_0_15px_rgba(230,126,34,0.8)] animate-scan"></div>
                                {/* Corners */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                            </div>
                            <p className="absolute bottom-32 left-0 right-0 text-center text-white/80 text-sm font-medium animate-pulse">
                                Aponte para o pet e mantenha firme...
                            </p>
                        </div>
                    </div>
                ) : predictions.length > 0 ? (
                    // Results View
                    <div className="w-full h-full relative">
                        {/* We could capture a frame to canvas to show "frozen" image, 
                            but for specific implementation simplicity we just show results on black or last frame if we handled canvas */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark p-1 mb-6 shadow-glow">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                    <span className="text-5xl">🧬</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-1">Resultado da Análise</h2>
                            <div className="w-full max-w-sm mt-6 space-y-3">
                                {predictions.slice(0, 3).map((pred, idx) => {
                                    const translatedName = Object.entries(TRANSLATIONS).find(([key]) => pred.className.toLowerCase().includes(key))?.[1] || pred.className;
                                    const percent = Math.round(pred.probability * 100);

                                    return (
                                        <div key={idx} className="bg-white/10 rounded-xl p-4 flex items-center gap-4 border border-white/5">
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-white/50">
                                                #{idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg capitalize">{translatedName}</h3>
                                                <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="font-mono font-bold text-primary">{percent}%</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={reset}
                                className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">center_focus_weak</span>
                                Escanear Novamente
                            </button>
                        </div>
                    </div>
                ) : (
                    // Initial State / Permissions / Loading
                    <div className="text-center p-8">
                        {isModelLoading ? (
                            <>
                                <span className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin block mx-auto mb-4"></span>
                                <p className="text-white/60">Carregando IA...</p>
                            </>
                        ) : cameraError ? (
                            <div className="flex flex-col items-center">
                                <span className="material-symbols-outlined text-4xl text-rose-500 mb-2">videocam_off</span>
                                <p className="text-white/80 max-w-xs">{cameraError}</p>
                                <button onClick={startCamera} className="mt-4 text-primary font-bold">Tentar Novamente</button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center animate-fadeIn">
                                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-glow">
                                    <span className="material-symbols-outlined text-4xl text-primary">smart_toy</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Pet Vision AI</h2>
                                <p className="text-gray-400 max-w-xs mb-8 text-sm">
                                    Aponte a câmera para um cão ou gato para identificar sua raça provável instantaneamente.
                                </p>
                                <button
                                    onClick={startCamera}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark rounded-2xl font-bold text-white shadow-glow-lg hover:shadow-primary/50 transition-all active:scale-95 flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined">play_circle</span>
                                    Iniciar Câmera
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Controls (Only when scanning) */}
            {isScanning && !predictions.length && (
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center bg-gradient-to-t from-black/90 to-transparent">
                    <button
                        onClick={captureAndAnalyze}
                        disabled={analyzing}
                        className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${analyzing ? 'scale-90 opacity-50' : 'hover:scale-105 hover:bg-white/10 active:scale-95'
                            }`}
                    >
                        <div className="w-16 h-16 bg-white rounded-full"></div>
                    </button>
                </div>
            )}

            {/* Hidden Canvas for capture if needed */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default BreedScanner;
