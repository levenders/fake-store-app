import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@types': '/src/types',
      '@store': '/src/store',
      '@pages': '/src/pages',
      '@config': '/src/config',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@services': '/src/services',
      '@helpers': '/src/helpers',
      '@layout': '/src/layout',
    },
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
})
