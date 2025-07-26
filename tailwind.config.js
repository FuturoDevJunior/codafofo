const { withUt } = require('uploadthing/tw');

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@uploadthing/react/dist**',
  ],
  theme: {
    // Design System - Vytalle Estética Brand Colors (OFICIAL PDF)
    colors: {
      // Vitale Brand Colors - PALETA OFICIAL DO PDF
      vitale: {
        primary: '#d8a75b', // Brand Pastel - Cor principal da marca
        secondary: '#e79632', // Brand Base - Destaques e hover
        accent: '#ff5a00', // Brand Accent - CTA forte
        neutral: '#ffeacd', // Background Pastel - Fundos soft
        light: '#fbfafc', // Post Background - Fundos brancos
        dark: '#5b4322', // Texto de contraste sobre backgrounds claros
      },
      // Medical & Professional Palette - Baseada na marca oficial
      medical: {
        gold: '#d8a75b', // Dourado principal
        amber: '#e79632', // Âmbar profissional
        orange: '#ff5a00', // Laranja vibrante
        cream: '#ffeacd', // Creme suave
        white: '#fbfafc', // Branco puro
        brown: '#5b4322', // Marrom contraste
      },
      // Semantic Colors - Baseadas na paleta oficial Vytalle
      success: {
        50: '#fff9f1', // Creme muito claro
        100: '#ffeacd', // Background pastel oficial
        500: '#e79632', // Brand base - sucesso
        600: '#d8a75b', // Brand pastel
        700: '#c8955a', // Dourado escuro
      },
      warning: {
        50: '#fff5f0', // Laranja muito claro
        100: '#ffe5d6', // Laranja claro
        500: '#ff5a00', // Brand accent - alerta
        600: '#e65100', // Laranja médio
        700: '#cc4800', // Laranja escuro
      },
      error: {
        50: '#fff5f5', // Vermelho muito claro
        100: '#fee5e5', // Vermelho claro
        500: '#dc2626', // Vermelho padrão
        600: '#b91c1c', // Vermelho médio
        700: '#991b1b', // Vermelho escuro
      },
      info: {
        50: '#fff9f1', // Info claro baseado em creme
        100: '#ffeacd', // Background pastel para info
        500: '#d8a75b', // Brand pastel para info
        600: '#c8955a', // Info médio
        700: '#5b4322', // Marrom escuro para contraste
      },
      // Neutral Scale (High Contrast)
      neutral: {
        50: '#FAFAFA', // Lightest backgrounds
        100: '#F5F5F5', // Light backgrounds
        200: '#E5E5E5', // Subtle borders
        300: '#D4D4D4', // UI borders
        400: '#A3A3A3', // Disabled text
        500: '#737373', // Secondary text
        600: '#525252', // Body text
        700: '#404040', // Headings
        800: '#262626', // Dark headings
        900: '#171717', // Maximum contrast
      },
      // Shadcn/UI Compatibility
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
    },

    // Typography System
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }], // 36px
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }], // 48px
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }], // 60px
    },

    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'], // Corpo & legendas
      heading: ['Montserrat', 'system-ui', 'sans-serif'], // Headings / Títulos
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      body: ['Poppins', 'system-ui', 'sans-serif'], // Alias para corpo
      display: ['Montserrat', 'system-ui', 'sans-serif'], // Alias para display
    },

    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },

    // Spacing System (8px base grid)
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem', // 2px
      1: '0.25rem', // 4px
      1.5: '0.375rem', // 6px
      2: '0.5rem', // 8px
      2.5: '0.625rem', // 10px
      3: '0.75rem', // 12px
      3.5: '0.875rem', // 14px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      7: '1.75rem', // 28px
      8: '2rem', // 32px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
      11: '2.75rem', // 44px
      12: '3rem', // 48px
      14: '3.5rem', // 56px
      16: '4rem', // 64px
      20: '5rem', // 80px
      24: '6rem', // 96px
      28: '7rem', // 112px
      32: '8rem', // 128px
      36: '9rem', // 144px
      40: '10rem', // 160px
      44: '11rem', // 176px
      48: '12rem', // 192px
      52: '13rem', // 208px
      56: '14rem', // 224px
      60: '15rem', // 240px
      64: '16rem', // 256px
      72: '18rem', // 288px
      80: '20rem', // 320px
      96: '24rem', // 384px
    },

    // Border Radius System
    borderRadius: {
      none: '0px',
      sm: '0.125rem', // 2px
      DEFAULT: '0.25rem', // 4px
      md: '0.375rem', // 6px
      lg: '0.5rem', // 8px
      xl: '0.75rem', // 12px
      '2xl': '1rem', // 16px
      '3xl': '1.5rem', // 24px
      full: '9999px',
    },

    // Shadow System
    boxShadow: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      glow: '0 0 20px rgb(216 167 91 / 0.3)',
      medical: '0 4px 20px rgb(216 167 91 / 0.15)',
      success: '0 4px 20px rgb(231 150 50 / 0.15)',
      vitale: '0 8px 32px rgb(216 167 91 / 0.12)',
      brand: '0 6px 24px rgb(255 90 0 / 0.2)',
      none: 'none',
    },

    // Container System
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },

    extend: {
      // Animation System
      keyframes: {
        // Loading animations
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        // Micro-interactions
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // UI feedback
        'success-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgb(16 185 129 / 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgb(16 185 129 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(16 185 129 / 0)' },
        },
        'error-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        // Shadcn/UI compatibility
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        // Loading states
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 1s infinite',
        shake: 'shake 0.5s ease-in-out',
        // Micro-interactions
        'scale-in': 'scale-in 0.15s ease-out',
        'scale-out': 'scale-out 0.15s ease-in',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        // UI feedback
        'success-pulse': 'success-pulse 2s infinite',
        'error-shake': 'error-shake 0.5s ease-in-out',
        // Shadcn/UI compatibility
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },

      // Transition System
      transitionDuration: {
        75: '75ms',
        150: '150ms',
        200: '200ms',
        250: '250ms',
        400: '400ms',
      },

      // Z-index System
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        'modal-backdrop': '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
        toast: '1080',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom utilities plugin
    function ({ addUtilities }) {
      addUtilities({
        // Focus states for accessibility
        '.focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-vitale-primary focus:ring-offset-2':
            {},
        },
        '.focus-ring-inset': {
          '@apply focus:outline-none focus:ring-2 focus:ring-vitale-primary focus:ring-inset': {},
        },
        // Text contrast utilities
        '.text-contrast-aa': {
          color: 'rgb(var(--foreground))',
          contrast: '4.5',
        },
        '.text-contrast-aaa': {
          color: 'rgb(var(--foreground))',
          contrast: '7',
        },
        // Loading states
        '.loading': {
          '@apply animate-pulse-soft pointer-events-none': {},
        },
        // Interactive states
        '.interactive': {
          '@apply transition-all duration-150 ease-out hover:scale-105 active:scale-95': {},
        },
      });
    },
  ],
});
