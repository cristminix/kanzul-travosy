import DBGit from "./DBGit"

class DBGitSingle extends DBGit {
  type = "single"

  async get() {
    return await this.getData()
  }
  async update(data) {
    this.data = data
    await this.fs.writeFileSync(this.getFilePath(), JSON.stringify(data, null, 2))
  }
}

export default DBGitSingle
