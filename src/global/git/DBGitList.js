import DBGit from "./DBGit"
class DBGitList extends DBGit {
  type = "list"
  async getList(option = {}, loadFromCache = false) {
    return await this.getData()
  }

  async getRow(pk, loadFromCache = false) {
    // consolel.log(pk)
    await this.getData(loadFromCache)
    const filteredData = this.data.filter((item) => item[this.pk] === pk)
    if (filteredData.length > 0) {
      const [row] = filteredData
      return row
    }

    return null
  }
  async update(pk, row, loadFromCache = false) {
    let oData = await this.getRow(pk, loadFromCache)
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
    /*------ Save File ------*/
    await this.fs.writeFileSync(this.getFilePath(),JSON.stringify(newDataToBeSaved,null,2))
    // console.log(newDataToBeSaved)
    await this.commit(true)
  }

  async commit(push = false) {
    const commitFileList = this.commitQueues
    commitFileList.push(this.path)
    const commitMessage = `${this.commitMessageQueues.join("\n")}\nEdit file ${this.path}`
    console.log({commitFileList, commitMessage})
    
    // return

    let result = await this.git.commit(commitFileList, commitMessage)
    this.commitQueues = []
    this.commitMessageQueues = []
    if (push) {
      result = await this.push()
    }
    return result
  }

  async updateRow(row, loadFromCache = false) {
    console.log(row)
    const pk = row[this.pk]
    await this.update(pk, row)

    // object item updated
    // console.log(this.data)

    // await this.commitByRow(row,true)
  }

  async delete(pk) {}

  async create(row, loadFromCache) {}

  async getCount(loadFromCache = false) {}
}

export default DBGitList