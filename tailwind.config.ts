import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Warm minimal palette (Notion-style)
                background: {
                    DEFAULT: '#f5f5f0',
                    secondary: '#ffffff',
                    tertiary: '#fafaf8',
                    sidebar: '#fefefe',
                },
                foreground: {
                    DEFAULT: '#1a1a1a',
                    muted: '#4a4a4a',
                    subtle: '#8a8a8a',
                },
                accent: {
                    DEFAULT: '#c9a76c',       // Warm gold
                    light: '#e8d5b5',
                    purple: '#8b7cf6',        // For AI Projects
                    blue: '#6bb3e8',          // For Work Experience  
                    green: '#7dd3a8',         // For Case Studies
                    orange: '#f5a855',        // For Freelance
                    pink: '#e891b0',          // For Recognition
                    teal: '#5ebdbd',          // For Outside Work
                },
                border: {
                    DEFAULT: '#e5e5e0',
                    hover: '#d5d5d0',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'title': ['1.25rem', { lineHeight: '1.4' }],
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
                'sidebar': '2px 0 8px rgba(0, 0, 0, 0.04)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'slide-down': 'slideDown 0.3s ease-out forwards',
                'accordion-down': 'accordionDown 0.2s ease-out',
                'accordion-up': 'accordionUp 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                accordionDown: {
                    from: { height: '0', opacity: '0' },
                    to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
                },
                accordionUp: {
                    from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
                    to: { height: '0', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}

export default config
