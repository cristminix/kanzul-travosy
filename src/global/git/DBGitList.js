import DBGit from "./DBGit"
class DBGitList extends DBGit {
  type = "list"
  async getList(option = {}, loadFromCache = false) {
    return await this.getData()
  }

  async getRow(pk, loadFromCache = false) {
    const data = await this.getData()
    const filteredData = data.filter((item) => item.id === pk)
    if (filteredData.length > 0) {
      const [row] = filteredData
      return row
    }

    return null
  }

  async update(pk, row, loadFromCache = false) {}

  async delete(pk) {}

  async create(row, loadFromCache) {}

  async getCount(loadFromCache = false) {}
}

export default DBGitList
