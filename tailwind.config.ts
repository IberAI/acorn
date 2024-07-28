
import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', ...fontFamily.sans],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.current'),
            },
          },
        },
      }),
      colors: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
        black: '#040709',
        black2: '#232321',
        white: '#ffffff',
        gray: colors.slate,
        primary: {
          DEFAULT: '#f79627',
          400: '#fabc69',
          600: '#f57c1b',
        },
        secondary: {
          DEFAULT: '#61473d',
          400: '#7e5a53',
          500: '#694b44',
          600: '#49332d',
        },
        tertiary: colors.emerald,
      },
    },
  },
  plugins: [forms, typography],
}

export default config

