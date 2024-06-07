import DBGit from "./DBGit"

class DBGitSingle extends DBGit {
  type = "single"

  async get(loadFromCache=false) {
    return await this.getData()
  }
  async update(row,loadFromCache=false) {
    let oData = await this.get(loadFromCache)
    // console.log(oData)
    const fieldNames = this.getFieldNames()
    const shouldIdo = this.shouldIDoTransformField(fieldNames)

    // update value
    for (const prop of fieldNames) {
      if (!this.reservedFieldValues.includes(prop)) {
        oData[prop] = row[prop]
      }
    }
    let newDataToBeSaved = await this.transformShadowFieldOnSave() 
    /*------- do checking rootField ------*/
    if(this.dataRootField){
      let tmpData = {...this.originalData}
      tmpData[this.dataRootField] = newDataToBeSaved
      newDataToBeSaved = tmpData
    }
    console.log(newDataToBeSaved)
    /*------ Save File ------*/
    // await this.fs.writeFileSync(this.getFilePath(),JSON.stringify(newDataToBeSaved,null,2))
    // console.log(newDataToBeSaved)
    // await this.commit(true)
  }

  async commit(push = false) {
    let result = await this.git.commit([this.path])
    if (push) {
      result = await this.push()
    }
    return result
  }
}

export default DBGitSingle
