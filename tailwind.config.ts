import flowbite from 'flowbite-react/tailwind'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      lineClamp: {
        10: '10',
      },
    },
  },

  plugins: [require('@tailwindcss/typography'), flowbite.plugin()],
}
export default config
