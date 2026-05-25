import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  output: 'server',
  integrations: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT || 4321),
  },
  vite: {
    envDir: '../',
  },
})