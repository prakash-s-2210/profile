import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "success-300": "#BEF264",
        "secondary-100": "#E0F2FE",
        "secondary-800": "#075985"
      }
    },
  },
  plugins: [],
}
export default config
