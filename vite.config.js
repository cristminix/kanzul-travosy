import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import mpaPlugin from 'vite-plugin-mpa-plus'
// https://vitejs.dev/config/
import mpaConfig from "./mpa.config.json" assert {type:'json'}
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    mpaPlugin({
      pages: mpaConfig
  })
    ,react()],
})
