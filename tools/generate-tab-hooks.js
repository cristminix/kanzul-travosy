import { getJson, dashToCamel, ucfirst, pluralToSingular } from "./fn/index.js"

import fg from "fast-glob"
import fs from "node:fs"
import path, { basename } from "node:path"
const CWD = process.cwd()

const main = async () => {
  const config = {
    itemName: "hero",
    type: "list",
  }

  const itemNameVar = dashToCamel(config.itemName)
  const itemNameUc = ucfirst(itemNameVar)
  const modelName = `M${itemNameUc}`
  const modelNameVar = `m${itemNameUc}`

  let modelBuffer = `
import DBGitSingle from "../DBGitSingle"
class ${modelName} extends DBGitSingle {
  path = "web/data/${config.itemName}.json"
  //dataRootField="contents"	

}

export default ${modelName} 
 `
  if (config.type === "list") {
    modelBuffer = `
mport DBGitList from "@/global/git/DBGitList"
//import {fileTransform} from "@/global/git/models/shadow-field-transformer/fileTransform"

class ${modelName} extends DBGitList{
	path="web/data/${config.itemName}.json"
//	dataRootField="contents"	
//	imageUploadPath="assets/images/${config.itemName}"
//	shadowFields = {
//	    cover : fileTransform
//	  }
}

export default ${modelName}
    `
  }
  let viewBuffer = `
<Tab eventKey="${config.itemName}" title="${itemNameUc}">
{tabKey === "${config.itemName}" && (
    <>
    {${itemNameVar}FormShown ? (
        <>
        <JsonForm
            schema={${itemNameVar}Schema}
            uiSchema={${itemNameVar}UiSchema}
            title="Edit ${itemNameUc} Data"
            formData={${itemNameVar}FormData}
            onCancel={(e) => show${itemNameUc}Form(false)}
            onSubmit={(e) => onSave${itemNameUc}Form(e)}
        />
        </>
    ) : (
        <>
        <RowDataDisplay schema={${itemNameVar}Schema} rowData={${itemNameVar}FormData} title="${itemNameUc} Data" />
        <div className="twx-py-4 twx-flex twx-justify-end">
            <Button size="sm" onClick={(e) => showEdit${itemNameUc}Form(true)}>
            <i className="mdi mdi-pencil-box-outline" /> Ubah
            </Button>
        </div>
        </>
    )}
    </>
)}
</Tab>
`
if(config.type==="list"){
  viewBuffer=`
<Tab eventKey="${config.itemName}" title="${itemNameUc}">
                {tabKey === "${config.itemName}" && (
                  <>
                    {!form${itemNameUc}Shown ? (
                      <>
                        <h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Daftar ${itemNameUc}</h4>
                        <${itemNameUc}List
                          git={git}
                          className="twx-border twx-border-slate-200 twx-border-solid"
                          data={${itemNameVar}ListData}
                          onEditRow={(row) => showEditForm${itemNameUc}(row)}
                        />
                      </>
                    ) : (
                      <>
                        <JsonForm
                          title={${'`'}Edit Item ${itemNameUc}${'`'}}
                          formData={${itemNameVar}FormData}
                          schema={${itemNameVar}Schema}
                          uiSchema={${itemNameVar}UiSchema}
                          onSubmit={(e) => onSaveForm${itemNameUc}(e)}
                          onCancel={(e) => showForm${itemNameUc}(false)}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
  `
}


  let importBuffer = `
import ${itemNameVar}Schema from "@/web/data/forms/${config.itemName}/schema.json"
import ${itemNameVar}UiSchema from "@/web/data/forms/${config.itemName}/ui.json"
import ${modelName} from "@/global/git/models/${modelName}"

const ${modelNameVar} = new ${modelName}(git, ${itemNameVar}Schema)
`

let hookBuffer = `
  const [${itemNameVar}FormShown, show${itemNameUc}Form] = useState(false)
  const [${itemNameVar}FormData, set${itemNameUc}FormData] = useState(${modelName}.defaultValue)
  const load${itemNameUc}Data = async () => {
    const data = await m${itemNameUc}.get()
    console.log(data)
    set${itemNameUc}FormData(data)
  }
  const showEdit${itemNameUc}Form = () => {
    show${itemNameUc}Form(true)
  }
  const onSave${itemNameUc}Form = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await m${itemNameUc}.update(formData)
      await m${itemNameUc}.commit(true)
    } catch (e) {
      showAlert("danger", "error", e.toString())
    }
    show${itemNameUc}Form(false)
    showLoading(false)
    load${itemNameUc}Data()
  }
`
if(config.type==="list"){
  hookBuffer=`
  const [${itemNameVar}ListData, set${itemNameUc}ListData] = useState([])
  const [${itemNameVar}FormData, set${itemNameUc}FormData] = useState(null)
  const [form${itemNameUc}Shown, showForm${itemNameUc}] = useState(false)

  const load${itemNameUc}ListData = async () => {
    const data = await m${itemNameUc}.getData()
    set${itemNameUc}ListData(data)
  }
  const showEditForm${itemNameUc} = async (row) => {
    // const formData =
    set${itemNameUc}FormData(row)
    showForm${itemNameUc}(true)
  }
  const onSaveForm${itemNameUc} = async (e) => {
    const { formData } = e
    showLoading(true)
    try {
      await m${itemNameUc}.updateRow(formData, true)
    } catch (e) {
      showAlert("danger", "error", e.toString())
    }

    showLoading(false)
    showForm${itemNameUc}(false)
    load${itemNameUc}ListData()
  }
`
}

let componentListBuffer=`

`
  let outputDir = path.join(CWD, "tools/output/generate-tab-hooks")

  if (!(await fs.existsSync(outputDir))) {
    await fs.mkdirSync(outputDir)
  }

  outputDir = path.join(outputDir, config.itemName)

  if (!(await fs.existsSync(outputDir))) {
    await fs.mkdirSync(outputDir)
  }
  const importOutFilename = path.join(outputDir, "import.js")
  const hookOutFilename = path.join(outputDir, "hook.js")
  const viewOutFilename = path.join(outputDir, "view.js")
  const modelOutFilename = path.join(outputDir, `${modelName}.js`)

  console.log(`WRITE:${modelOutFilename}`)
  await fs.writeFileSync(modelOutFilename, modelBuffer)

  console.log(`WRITE:${importOutFilename}`)
  await fs.writeFileSync(importOutFilename, importBuffer)

  console.log(`WRITE:${hookOutFilename}`)
  await fs.writeFileSync(hookOutFilename, hookBuffer)

  console.log(`WRITE:${viewOutFilename}`)
  await fs.writeFileSync(viewOutFilename, viewBuffer)
}

main()
