import DBGit from "./DBGit"
class DBGitFileList extends DBGit {
  type = "files"
  async getList(option = {}, loadFromCache = false) {
    return await this.getData()
  }


  async getRow(name, loadFromCache = false) {
    if(!loadFromCache){
      await this.getData()
    }
    const filteredData = this.data.filter((item) => item.name === name)
    if (filteredData.length > 0) {
      let [row] = filteredData
      return row
    }

    return null
  }

  async update(name, row, loadFromCache = false) {
    let oData = await this.getRow(name, loadFromCache)
    for(const prop of Object.keys(oData)){
      if(!this.reservedFieldValues.includes(prop))
        oData[prop]=row[prop]
    }
  }

  async updateRow(row, loadFromCache = false) {
    const {name} = row
    await this.update(name,row)

    // object item updated
    // console.log(this.data)

    await this.commitByRow(row,true)
  }
  async commitByRow(row,push=false){
    const rowPath = row['@path']
    const rowBuffer = JSON.stringify(row,null,2)
    console.log( `WRITE:${rowPath}`)  
    try{
      await this.fs.writeFileSync(rowPath,rowBuffer)

    }catch(e){
      console.log(`lfs write error on ${rowPath}`)
    }
    const rowPathRelative = this.git.getRelativePath(rowPath)
    // console.log(rowPathRelative)
    let result = await this.git.commit([rowPathRelative])
    if (push) {
      result = await this.push()
    }
    // return result
    console.log(result)
  }

  async delete(name) {}

  async create(row, loadFromCache) {}

  async getCount(loadFromCache = false) {}
}

export default DBGitFileList
