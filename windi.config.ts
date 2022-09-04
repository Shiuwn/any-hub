// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,js,css,html,tsx}'],
    exclude: ['node_modules', '.git', '.next/**/*'],
  },
})
