import { defineConfig, normalizePath } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import mpaPlugin from "vite-plugin-mpa-plus"
import htmlPlugin from "./my-plugins/htmlPlugin.js"
// import devServer from "@hono/vite-dev-server"
// import mix from "vite-plugin-mix"
// import { pluginAPIRoutes } from "vite-plugin-api-routes"

// https://vitejs.dev/config/
import mpaConfig from "./mpa.config.json" assert { type: "json" }
import { viteStaticCopy } from "vite-plugin-static-copy"
import fg from "fast-glob"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"

let jsonDataFileList = fg.globSync("./src/web/data/**/*.{json,db,wasm}")
// console.log(jsonDataFileList)
let pages_jsonFileList = []
let templates_jsonFileList = []
let forms_jsonFileList = []
let default_jsonFileList = []
let berita_dbFileList = []
let produk_dbFileList = []
let sql_dbFileList = []

for (const file of jsonDataFileList) {
  // console.log(file)
  if (file.match(/\web\/data\/sql/)) {
    sql_dbFileList.push(file)
  }
  if (file.match(/\web\/data\/pages/)) {
    pages_jsonFileList.push(file)
  }
  //web/data/forms/
  else if (file.match(/\web\/data\/forms/)) {
    forms_jsonFileList.push(file)
  } else if (file.match(/\web\/data\/templates/)) {
    templates_jsonFileList.push(file)
  } else if (file.match(/\web\/data\/berita/)) {
    berita_dbFileList.push(file)
  } else if (file.match(/\web\/data\/produk/)) {
    produk_dbFileList.push(file)
  } else {
    default_jsonFileList.push(file)
  }
  // web/data/templates
}
let template_sectionFileList = []
let template_blockFileList = []
let template_rootFileList = []

for (const file of templates_jsonFileList) {
  if (file.match(/\web\/data\/templates\/sections/)) {
    template_sectionFileList.push(file)
  } else if (file.match(/\web\/data\/templates\/blocks/)) {
    template_blockFileList.push(file)
  } else {
    template_rootFileList.push(file)
  }
}

console.log(template_sectionFileList)

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  plugins: [
    // mixPlugin,
    htmlPlugin(),
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: default_jsonFileList,
          dest: "web/data",
        },
        {
          src: pages_jsonFileList,
          dest: "web/data/pages",
        },
        {
          src: template_rootFileList,
          dest: "web/data/templates",
        },
        {
          src: template_sectionFileList,
          dest: "web/data/templates/sections",
        },
        {
          src: template_blockFileList,
          dest: "web/data/templates/blocks",
        },
        {
          src: berita_dbFileList,
          dest: "web/data/berita",
        },
        {
          src: produk_dbFileList,
          dest: "web/data/produk",
        },
        {
          src: sql_dbFileList,
          dest: "web/data/sql",
        },
      ],
    }),
    mpaPlugin({
      pages: mpaConfig,
    }),
    react(),
    //Remix ChunkSplit
    // chunkSplitPlugin({
    //   strategy: "unbundle",
    //   customChunk: (args) => {
    //     const { file } = args
    //     // If ROOT Script
    //     if (file == ".api/server.js") {
    //       return null
    //     }
    //     return "routers"
    //   },
    // }),
  ],
  build: {
    sourcemap: true,

    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
})
