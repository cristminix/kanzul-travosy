import { defineConfig, normalizePath } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import mpaPlugin from "vite-plugin-mpa-plus"
// import devServer from "@hono/vite-dev-server"
// import mix from "vite-plugin-mix"
// import { pluginAPIRoutes } from "vite-plugin-api-routes"

// https://vitejs.dev/config/
import mpaConfig from "./mpa.config.json" assert { type: "json" }
import { viteStaticCopy } from "vite-plugin-static-copy"
import fg from "fast-glob"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"

let jsonDataFileList = fg.globSync("./src/web/data/**/*.json")
let pages_jsonFileList = []
let templates_jsonFileList = []
let forms_jsonFileList = []
let default_jsonFileList = []

for(const jsonFile of jsonDataFileList){
  // console.log(jsonFile)
  if(jsonFile.match(/\web\/data\/pages/)){
    pages_jsonFileList.push(jsonFile)
  }
  //web/data/forms/
  else if(jsonFile.match(/\web\/data\/forms/)){
    forms_jsonFileList.push(jsonFile)
  }
  else if(jsonFile.match(/\web\/data\/templates/)){
    templates_jsonFileList.push(jsonFile)
  }else{
    default_jsonFileList.push(jsonFile)
  }
  // web/data/templates
}
let template_sectionFileList = []
let template_blockFileList = []
let template_rootFileList = []

for(const jsonFile of templates_jsonFileList){
  if(jsonFile.match(/\web\/data\/templates\/sections/)){
    template_sectionFileList.push(jsonFile)
  }
  else if(jsonFile.match(/\web\/data\/templates\/blocks/)){
    template_blockFileList.push(jsonFile)
  }else{
    template_rootFileList.push(jsonFile)
  }
}

console.log(template_sectionFileList)

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  plugins: [
    // mixPlugin,
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
          dest:"web/data/templates"
        },
        {
          src: template_sectionFileList,
          dest:"web/data/templates/sections"
        },
        {
          src: template_blockFileList,
          dest:"web/data/templates/blocks"
        }
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
    commonjsOptions: { transformMixedEsModules: true } // Change
  }
})
