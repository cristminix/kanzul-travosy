import { defineConfig,normalizePath  } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import mpaPlugin from 'vite-plugin-mpa-plus'
// https://vitejs.dev/config/
import mpaConfig from "./mpa.config.json" assert {type:'json'}
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fg from "fast-glob"
import { nodePolyfills } from "vite-plugin-node-polyfills"

const copyAssetsFileList = fg.globSync('./src/web/data/**/*.json',{ ignore: ['schema.json','data.json','ui.json'] })
// console.log(src)
// process.exit(0)
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  plugins: [
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: copyAssetsFileList,
          dest: 'web/data'
        }
      ]
    }),
    mpaPlugin({
      pages: mpaConfig
  })
    ,react()],
})
