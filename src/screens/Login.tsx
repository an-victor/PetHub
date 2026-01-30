import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center shadow-glow-lg mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-white">pets</span>
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Bem-vindo ao PetHub</h1>
            </div>

            <SignIn
                signUpUrl="/register"
                forceRedirectUrl="/"
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "bg-surface shadow-soft-xl border-none rounded-[32px] p-8",
                        headerTitle: "text-text-primary font-bold text-xl",
                        headerSubtitle: "text-text-secondary text-sm",
                        formButtonPrimary: "bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-glow hover:shadow-glow-lg transition-all",
                        formFieldInput: "bg-background border-transparent focus:border-primary rounded-xl py-3",
                        formFieldLabel: "text-text-secondary font-semibold",
                        footerActionLink: "text-primary font-bold hover:text-primary-dark",
                        identityPreviewText: "text-text-primary",
                        identityPreviewEditButton: "text-primary",
                    },
                    variables: {
                        colorPrimary: '#E67E22',
                        colorText: '#1f2937',
                        colorBackground: '#ffffff',
                        fontFamily: 'Poppins, sans-serif'
                    }
                }}
            />
        </div>
    );
};

export default Login;
