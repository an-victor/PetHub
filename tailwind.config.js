/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
        "!./node_modules/**/*"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Semantic colors via CSS variables
                "primary": "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "primary-light": "var(--color-primary-light)",
                "accent": "var(--color-accent)",
                "accent-dark": "var(--color-accent-dark)",
                "background": "var(--color-background)",
                "surface": "var(--color-surface)",
                "surface-elevated": "var(--color-surface-elevated)",
                "text-primary": "var(--color-text-primary)",
                "text-secondary": "var(--color-text-secondary)",
                "text-muted": "var(--color-text-muted)",
                "border": "var(--color-border)",
                "success": "var(--color-success)",
                "warning": "var(--color-warning)",
                "danger": "var(--color-danger)",
            },
            fontFamily: {
                "display": ["Poppins", "sans-serif"],
                "sans": ["Poppins", "sans-serif"],
            },
            borderRadius: {
                "2xl": "16px",
                "3xl": "24px",
                "4xl": "32px",
            },
            boxShadow: {
                "soft": "var(--shadow-soft)",
                "soft-md": "var(--shadow-soft-md)",
                "soft-lg": "var(--shadow-soft-lg)",
                "soft-xl": "var(--shadow-soft-xl)",
                "glow": "var(--shadow-glow)",
                "glow-sm": "var(--shadow-glow-sm)",
            },
            animation: {
                'fadeIn': 'fadeIn 0.4s ease-out both',
                'slideUp': 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'slideDown': 'slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'slideInLeft': 'slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'slideInRight': 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'scaleIn': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'scaleSpring': 'scaleSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'bounceIn': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'float': 'float 3s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                scaleSpring: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { transform: 'scale(1.1)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(230, 126, 34, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(230, 126, 34, 0.5)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            screens: {
                'xs': '375px',
                'mobile': { 'max': '480px' },
            },
        },
    },
    plugins: [],
}
