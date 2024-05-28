import { getJson, dashToCamel, ucfirst } from "./fn/index.js"

import fg from "fast-glob"
import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()

const main = async () => {
  const copyAssetsFileList = fg.globSync(`src/web/data/**/*.json`, {
    ignore: ["schema.json", "data.json", "ui.json"],
  })

  for (const file of copyAssetsFileList) {
    const fileBasename = path.basename(file)
    const importPath = file.replace(/^src/, "@")

    if (["schema.json", "ui.json", "instagram-posts-list.json", "data.json"].includes(fileBasename)) {
      continue
    }
    const itemName = dashToCamel(fileBasename.replace(/\.json$/, "").replace(/\-list$/, ""))
    const itemNameUc = ucfirst(itemName)
    const fileUrl = `/web/data/${fileBasename}`
    const data = await getJson(file)
    const dataIsArray = Array.isArray(data)
    let templateBuffer = `
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ${itemName}Data from "${importPath}"
import { randStamp } from "@/global/fn"
export const fetch${itemNameUc}= createAsyncThunk("fetch-${itemName}", async () => {
    const response = await fetch(\`${fileUrl}?_=\${randStamp()}\`)
    return response.json()
})
export const push${itemNameUc} = createAsyncThunk("push-${itemName}", async (company) => {
    // create file ${fileUrl}
    // git add
    // git commit  with message update file above
    // git push

    const pushStatusOk = true
    return pushStatusOk
})
    `
    //
    let initialStateBuffer = "[]"
    if (!dataIsArray) {
      //   console.log(data)
      initialStateBuffer = "{\n"
      for (const prop of Object.keys(data)) {
        initialStateBuffer += `        ${prop}:"",\n`
      }
      initialStateBuffer += "    }"
    }
    templateBuffer += `
const initialState={
    data:${initialStateBuffer},
    fetchStatus: ""
}

export const ${itemName}Slice = createSlice({
    name: "${itemName}",
    initialState,
    reducers: {
      update${itemNameUc}: (state, action) => {
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetch${itemNameUc}.fulfilled, (state, action) => {
          state.data = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetch${itemNameUc}.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetch${itemNameUc}.rejected, (state) => {
          state.data = ${itemName}Data
          state.fetchStatus = "error"
        })
    },
  })
  
  export default ${itemName}Slice
`

    const outputPath = path.join(CWD, `src/global/store/features/${itemName}Slice.js`)
    console.log(`WRITE : ${outputPath}`)
    fs.writeFileSync(outputPath, templateBuffer)
    // break
  }
}

main()
