class DBGit {
  git = null
  fs = null
  type = null
  defaultValue = null
  data = null
  path = null
  constructor(git, schema, path = null) {
    this.git = git
    this.fs = git.fs
    if (path) this.path = path
    this.initDefaultValue(schema)
  }

  initDefaultValue(schema) {
    this.defaultValue = {}
    for (const prop of Object.keys(schema)) {
      this.defaultValue[prop] = ""
    }
  }

  async commit(push = false) {
    let result = await this.git.commit([this.path])
    if (push) {
      result = await this.push()
    }
    return result
  }
  async getData() {
    // await this.git.fastForward()
    let data = {}
    if (this.type === "files") {
      data = []
        const targetDir = this.getFilePath()
        if(await this.fs.existsSync(targetDir)){
          const files = await this.fs.readdirSync(targetDir)
          let id=1
          for(const file of files){
            let itemData = null
            try{
              const name = file.replace(/\.json$/,'')
              const itemPath = `${targetDir}/${file}`
              const itemBufferData = await this.fs.readFileSync(itemPath, "utf-8")
              itemData = JSON.parse(itemBufferData)
              itemData = {
                id,
                name,
                path:itemPath,
                ...itemData
              }
            }
            catch(e){
              console.log(`git: can't get json data from ${itemPath}`)
            }

            if(itemData){
              
              data.push(itemData)
              id+=1

            }
          }
        }
      return data  
      
    } else {
      try {
        const bufferData = await this.fs.readFileSync(this.getFilePath(), "utf-8")
        data = JSON.parse(bufferData)
      } catch (e) {
        console.error(e)
        if (this.type === "single") data = { ...this.defaultData }
        else data = []
      }
    }
    this.data = data
    return data
  }
  async push() {
    return await this.git.push()
  }
  getFilePath() {
    return `${this.git.dir}/${this.path}`
  }
}

export default DBGit