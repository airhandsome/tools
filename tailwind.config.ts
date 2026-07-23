import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/tools/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        surface: '#161B22',
        input: '#0D1117',
        border: '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'text-muted': '#484F58',
        accent: '#1F6FEB',
        success: '#3FB950',
        warning: '#F0883E',
        danger: '#F85149',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
};

export default config;
