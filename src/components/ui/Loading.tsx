import React from 'react';

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false, text = 'Carregando...' }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-fadeIn">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4 shadow-glow"></div>
                <p className="text-text-primary font-medium animate-pulse">{text}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
            {text && <p className="text-text-muted text-sm">{text}</p>}
        </div>
    );
};

export default Loading;
