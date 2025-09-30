// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel/static'
import icon from 'astro-icon'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  adapter: vercel({
    imageService: true,
  }),

  integrations: [icon(), react()],

  env: {
    schema: {
      SECRET_TEST: envField.string({ context: 'server', access: 'secret' }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_TEST: envField.string({ context: 'client', access: 'public' }),
    },
  },
})
