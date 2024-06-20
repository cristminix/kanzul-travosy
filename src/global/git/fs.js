import LightningFs from "@isomorphic-git/lightning-fs"
class Fs extends LightningFs {
  name = "fs"
  constructor(name) {
    super(name)
    this.name = name
  }
  async wipe() {
    await this.init(this.name, {
      wipe: true,
    })
  }
  async writeFileSync(path, data) {
    return await this.promises.writeFile(path, data)
  }

  async mkdirSync(name,opt={}) {
    if(opt.recursive){
      return await this.mkdirRecursiveSync(name)
    }
    return await this.promises.mkdir(name)
  }

  

  async existsSync(path) {
    try {
      if (await this.promises.stat(path)) return true
    } catch (e) {
      // console.error(e)
      console.log(`lfs: ${path} not found`)

    }
    return false
  }
  async statSync(path){
    return await this.promises.stat(path)
  }
  async readFileSync(path) {
    return await this.promises.readFile(path)
  }

  async unlinkSync(path) {
    return await this.promises.unlink(path)
  }

  async readdirSync(path) {
    return await this.promises.readdir(path)
  }
}

export default Fs
