import { getJson, dashToCamel, ucfirst, pluralToSingular } from "./fn/index.js"

import fg from "fast-glob"
import fs from "node:fs"
import path, { basename } from "node:path"
const CWD = process.cwd()

const buildSchema = async (config) => {
  let { itemName, data, dataIsArray, basename } = config

  const title = `${itemName} Form`
  const description = `Form untuk data ${itemName}`
  const type = "object"
  data = !dataIsArray ? data : data[0]
  const required = Object.keys(data)
  const properties = {}
  for (const prop of required) {
    properties[prop] = {
      title: itemName,
      type: "string",
    }
  }
  const schema = {
    title,
    description,
    type,
    required,
    properties,
  }

  const outputDir = path.join(CWD, `src/web/data/forms/${basename}`)
  const outputPath = path.join(CWD, `src/web/data/forms/${basename}/schema.json`)
  if (!fs.existsSync(outputDir)) {
    console.log(`MKDIR : ${outputDir}`)
    fs.mkdirSync(outputDir)
  }
  if (!fs.existsSync(outputPath)) {
    console.log(`WRITE : ${outputPath}`)
    fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2))
  } else {
    console.log(`SKIP : ${basename}`)
  }
}

const buildUiSchema = async (config) => {
  let { itemName, data, dataIsArray, basename } = config

  data = !dataIsArray ? data : data[0]
  const required = Object.keys(data)
  const schema = {}
  let index = 0
  for (const prop of required) {
    schema[prop] = {
      "ui:description": ucfirst(prop),
    }
    if (index == 0) {
      schema[prop]["ui:autofocus"] = true
    }
    index += 1
  }

  const outputDir = path.join(CWD, `src/web/data/forms/${basename}`)
  const outputPath = path.join(CWD, `src/web/data/forms/${basename}/ui.json`)
  if (!fs.existsSync(outputDir)) {
    console.log(`MKDIR : ${outputDir}`)
    fs.mkdirSync(outputDir)
  }
  if (!fs.existsSync(outputPath)) {
    console.log(`WRITE : ${outputPath}`)
    fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2))
  } else {
    console.log(`SKIP : ${basename}`)
  }
}
const buildFormComponent = async (config) => {
  const { itemName, itemNameUc, basename } = config
  let templateBuffer = `
  import { useEffect } from "react"
  import Form from "@rjsf/material-ui"
  import validator from "@rjsf/validator-ajv8"
  import schema from "@/web/data/forms/${basename}/schema.json"
  import uiSchema from "@/web/data/forms/${basename}/ui.json"
  
  const ${itemNameUc}Form = ({ formData }) => {
    const onFormChange = (e)=>{
      console.log(e)
    }
    const onFormSubmit = (e)=>{
      console.log(e)
    }
    const onFormError = (e)=>{
      console.log(e)
    }
  
    useEffect(() => {
    }, [])
  
    return (
      <div className="twx-border-solid twx-border twx-p-4">
        <Form
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onError={onFormError}
        />
      </div>
    )
  }
  export default ${itemNameUc}Form  
        `

  const outputPath = path.join(CWD, `src/admin/components/forms/${itemNameUc}Form.jsx`)
  console.log(`WRITE : ${outputPath}`)
  if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, templateBuffer)
  } else {
    console.log(`SKIP:${basename}`)
  }
}

const buildPage = async (config) => {
  const { itemName, itemNameUc } = config
  let templateBuffer = `
import { useDispatch, useSelector } from "react-redux"
import ${itemNameUc}Form from "@/admin/components/forms/${itemNameUc}Form"
import ${itemName}Slice, { fetch${itemNameUc} } from "@/global/store/features/${itemName}Slice"
import LoadingDot from "@/global/components/LoadingDot"
import { useEffect } from "react"
const ${itemNameUc} = ({}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { ${itemName} } = state
  const { update${itemNameUc} } = ${itemName}Slice.actions
  console.log(${itemName})
  useEffect(() => {
    dispatch(fetch${itemNameUc}())
    // load${itemNameUc}()
  }, [dispatch])
  return (
    <>
      <h4>Edit ${itemNameUc}</h4>
      {company.fetchStatus == "loading" && <LoadingDot />}
      {company.fetchStatus == "success" && <${itemNameUc}Form formData={${itemName}.data} />}
      <div>{/* <${itemNameUc}Form/> */}</div>
    </>
  )
}

export default ${itemNameUc}

  
  `
  const outputDir = path.join(CWD, `src/admin/pages/contents`)
  if (!fs.existsSync(outputDir)) {
    console.log(`MKDIR:${outputDir}`)
    fs.mkdirSync(outputDir)
  }
  const outputPath = path.join(CWD, `src/admin/pages/contents/${itemNameUc}.jsx`)
  console.log(`WRITE : ${outputPath}`)
  if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, templateBuffer)
  } else {
    console.log(`SKIP:${basename}`)
  }
}
const buildSnipet = async (navItems, configs) => {
  let navigationBuffer = `
  <!-- Web Navigation -->

  <ul>\n`
  let routeBuffer = `
{/* Route */}
import Content,{loader as contentLoader} from "@/admin/pages/Content"
`
  for (const item of navItems) {
    const config = configs[item]
    const { itemName, itemNameUc } = config
    routeBuffer += `import ${itemNameUc},{loader as ${itemName}Loader} from "@/admin/pages/contents/${itemNameUc}"\n`
  }
  routeBuffer += `
<Route path="/contents" element={<Content loader={contentLoader}/>} >  
  `

  for (const item of navItems) {
    const config = configs[item]
    const { itemName, itemNameUc } = config
    navigationBuffer += `\n  <li><Link to="/contents/${item}">${item}</Link></li>`
    routeBuffer += `\n  <Route path="/contents/${item}" element={<Content loader={contentLoader}/>}/>`
  }

  navigationBuffer += `\n</ul>`
  routeBuffer += `\n</Route>`
  const outputPath = path.join(CWD, `src/admin/pages/contents/snippet.md`)

  const templateBuffer = `
  ${navigationBuffer}

  ${routeBuffer}
  `

  console.log(`WRITE : ${outputPath}`)
  // if (!fs.existsSync(outputPath)) {
  fs.writeFileSync(outputPath, templateBuffer)
  // } else {
  // console.log(`SKIP:${basename}`)
  // }
  console.log(templateBuffer)
}
const main = async () => {
  const copyAssetsFileList = fg.globSync(`src/web/data/**/*.json`)
  const excludeFiles = ["schema.json", "ui.json", "instagram-posts-list.json", "data.json"]
  const navItems = []
  const configs = {}
  for (const file of copyAssetsFileList) {
    const fileBasename = path.basename(file)
    const importPath = file.replace(/^src/, "@")

    if (excludeFiles.includes(fileBasename)) {
      continue
    }
    let basename = pluralToSingular(fileBasename.replace(/\.json$/, "").replace(/\-list$/, ""))

    const itemName = dashToCamel(basename)
    const itemNameUc = ucfirst(itemName)
    const fileUrl = `/web/data/${fileBasename}`
    const data = await getJson(file)
    const dataIsArray = Array.isArray(data)

    const config = {
      fileBasename,
      importPath,
      itemName,
      itemNameUc,
      fileUrl,
      data,
      dataIsArray,
      basename,
    }
    // console.log(basename)
    // await buildSchema(config)
    // await buildUiSchema(config)
    // await buildFormComponent(config)
    // await buildPage(config)
    configs[basename] = config
    navItems.push(basename)
  }
  // console.log(navItems)
  await buildSnipet(navItems, configs)
}

main()
