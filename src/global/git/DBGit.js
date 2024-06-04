import { crc32id } from "@/global/fn/crc32id"
import DBGitError from "./DBGitError"
class DBGit {
  dbGitError = null
  git = null
  fs = null
  type = null
  defaultValue = null
  data = null
  path = null

  commitQueues = []
  commitMessageQueues = []

  originalData = null
  // if specified data will be  from this json fields
  /*
  {
    "a":"",
    "dataRootField":[
        ... this will be the list data ...
    ]
  }
  */

  // primary key field or for DBGitFileList will use name as default
  pk = "id"
  dataRootField = null

  // ShadowField Options
  shadowFields = null /* {
    image : {
      transformOnSave : (originalValue)=>{
        const newValue = ''
        return newValue
      },
      transformOnLoad : (originalValue)=>{
        const newValue = ''
        return newValue
      },
    }

  }*/

  // ShadowField Temporal values
  shadowedFieldValues = {
    /*
    pk : {image : "/assets/image/logo/logo-dark.png"}
    */
  }
  setDbErrorHandler(dbGitError) {
    this.dbGitError = dbGitError
  }
  getFieldNames() {
    return Object.keys(this.defaultValue)
  }
  // do data shadow fields data transform and store original
  shouldIDoTransformField(fieldNames) {
    const shouldIdo = Object.keys(this.shadowFields).some((r) => fieldNames.includes(r))
    return [shouldIdo]
  }
  async transformShadowFieldItemOnSave(row, fieldNames) {
    for (const field of fieldNames) {
      if (this.shadowFields[field]) {
        // store original value to shadowFieldValues
        if (!row[this.pk]) {
          row[this.pk] = crc32id()
        }
        const pkValue = row[this.pk]

        if (!this.shadowedFieldValues[pkValue]) {
          this.shadowedFieldValues[pkValue] = {}
        }
        // console.log(`doTransform`,this.shadowFields[field])

        // set new value
        row[field] = await this.shadowFields[field].transformOnSave(row[field], row, this)
        this.shadowedFieldValues[pkValue][field] = row[field]
      }
    }
  }
  async transformShadowFieldItemOnload(row, fieldNames) {
    // console.log(`doTransform`,row,fieldNames)

    for (const field of fieldNames) {
      if (this.shadowFields[field]) {
        // store original value to shadowFieldValues
        if (!row[this.pk]) {
          row[this.pk] = crc32id()
        }
        const pkValue = row[this.pk]

        if (!this.shadowedFieldValues[pkValue]) {
          this.shadowedFieldValues[pkValue] = {}
        }
        // console.log(`doTransform`,this.shadowFields[field])

        this.shadowedFieldValues[pkValue][field] = row[field]
        // set new value
        row[field] = await this.shadowFields[field].transformOnLoad(row[field], row, this)
      }
    }
    return row
  }
  async transformShadowFieldOnload() {
    if (this.shadowFields !== null) {
      // checking sould have we do transform
      const fieldNames = this.getFieldNames()
      const shouldIdo = this.shouldIDoTransformField(fieldNames)
      // do Transform
      if (shouldIdo) {
        if (this.type === "single") {
          this.data = await this.transformShadowFieldItemOnload(this.data, fieldNames)
        } else {
          for (let row of this.data) row = await this.transformShadowFieldItemOnload(row, fieldNames)
        }
      }
    }
  }
  async transformShadowFieldOnSave() {
    const sourceDataCopy = this.type === "single" ? { ...this.data } : [...this.data]
    if (this.shadowFields !== null) {
      // checking sould have we do transform
      const fieldNames = this.getFieldNames()
      const shouldIdo = this.shouldIDoTransformField(fieldNames)
      // do Transform
      if (shouldIdo) {
        if (this.type === "single") {
          sourceDataCopy = await this.transformShadowFieldItemOnSave(sourceDataCopy, fieldNames)
        } else {
          for (let row of sourceDataCopy) row = await this.transformShadowFieldItemOnSave(row, fieldNames)
        }
      }
    }
    return sourceDataCopy
  }
  reservedFieldValues = ["@path"]
  constructor(git, schema, path = null) {
    this.git = git
    this.fs = git.fs
    if (path) this.path = path
    this.initDefaultValue(schema)
    this.dbGitError = new DBGitError(this)
  }

  initDefaultValue(schema) {
    this.defaultValue = {}
    for (const prop of Object.keys(schema.properties)) {
      this.defaultValue[prop] = ""
    }
  }

  async getData(loadFromCache = false) {
    if (loadFromCache && this.data) return this.data
    // await this.git.fastForward()
    this.data = {}
    if (this.type === "files") {
      this.data = []
      const targetDir = this.getFilePath()
      if (await this.fs.existsSync(targetDir)) {
        const files = await this.fs.readdirSync(targetDir)
        let id = 1
        for (const file of files) {
          if(!file.match(/\.json$/)) continue
          let itemData = null
          const itemPath = `${targetDir}/${file}`

          try {
            const name = file.replace(/\.json$/, "")
            const itemBufferData = await this.fs.readFileSync(itemPath, "utf-8")
            itemData = JSON.parse(itemBufferData)
            itemData = {
              id,
              name,
              ["@path"]: itemPath,
              ...itemData,
            }
          } catch (e) {
            const errorReason = `lfs: can't get json data from ${itemPath}`
            // console.log(errorReason)
            this.dbGitError.report(`GET_DATA`, errorReason)
          }

          if (itemData) {
            this.data.push(itemData)
            id += 1
          }
        }
      }
    } else {
      try {
        const bufferData = await this.fs.readFileSync(this.getFilePath(), "utf-8")
        this.data = JSON.parse(bufferData)
        if (this.dataRootField) {
          // save original tree data
          this.originalData = Array.isArray(this.data) ? [...this.data] : { ...this.data }
          this.data = this.data[this.dataRootField]
        }
      } catch (e) {
        const errorReason = `lfs:Could not get json data by reading file ${this.getFilePath()}`
        this.dbGitError.report(`GET_DATA`, errorReason)
        if (this.type === "single") this.data = { ...this.defaultData }
        else this.data = []
      }
    }
    await this.transformShadowFieldOnload()
    return this.data
  }
  async push() {
    return await this.git.push()
  }
  getFilePath() {
    return `${this.git.dir}/${this.path}`
  }
}

export default DBGit
