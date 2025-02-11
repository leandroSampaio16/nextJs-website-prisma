import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./**/@material-tailwind/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors:{
      transparent: "transparent",
      background: "#EAEAEA",
      branco: "#FFFFFF",
      preto: "#000000",
      cor1: "#91C8E4",
      cor2: "#749BC2",
      cor3: "#91C8E4",
      cor4: "#5BBBEC",
      cor5: "#D9D9D9",
      azul: "#000080",
      vermelho: "#D21404"
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
export default config
