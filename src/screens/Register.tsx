import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Register: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-text-primary">Crie sua conta no PetHub</h1>
                <p className="text-text-secondary text-sm mt-1">Junte-se a milhares de tutores</p>
            </div>

            <SignUp
                signInUrl="/#/login"
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

export default Register;
