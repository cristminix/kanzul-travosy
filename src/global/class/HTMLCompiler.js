import MetaParser from "./MetaParser"
import { calculateChecksum } from "../fn/calculateChecksum"
import { slugify } from "../fn/slugify"

class HTMLCompiler {
  model = null
  source = null
  outDir = null
  git = null
  baseDir = null
  parser = null
  errorHandler = null
  prefix = "baca"
  slugField = "title"
  constructor(model) {
    this.model = model
    this.source = model.compiler.source
    this.outDir = model.compiler.outDir
    this.prefix = model.compiler.prefix
    this.slugField = model.compiler.slugField
  }
  setBaseDir(path) {
    this.baseDir = path
  }
  setTitle(title) {}
  setErrorLogger(handler = (f) => f) {
    this.errorHandler = handler
  }
  compileTransform(sourceContent, row) {
    this.parser = new MetaParser(sourceContent)
    const source = this.model.compile(this.parser, row)
    // console.log(this.parser.save())
    // const metaRegex=''
    // console.log(source)
    return source
  }
  async initOutputDir(outDirGitPath, baseDir) {
    const { fs, dir } = this.model.git
    const outDirSplit = outDirGitPath.split("/")
    let index = 0
    let lastPath = []
    const success = true
    for (const directory of outDirSplit) {
      const dirPath = index > 0 ? `${lastPath.join("/")}/${directory}` : directory
      lastPath.push(directory)

      const dirFsPath = `${baseDir}/${dirPath}`
      if (!(await fs.existsSync(dirFsPath))) {
        try {
          console.log(`lfs: mkdir ${dirFsPath}`)
          await fs.mkdirSync(dirFsPath)
        } catch (e) {
          const message = `lfs error:cant mkdir ${dirFsPath}`
          this.errorHandler(message, e)
          console.log(message, e)
        }
      }
      if (!(await fs.existsSync(dirFsPath))) {
        success = false
      }
      // console.log(dirFsPath)
      index += 1
    }
    // console.log(outDirSplit)
    return success
  }
  async getChecksum(row) {
    let checksum = null
    // const row = await this.model.getRow(id)
    if (row) {
      let { fs, dir } = this.model.git
      if (this.baseDir) {
        dir = this.baseDir
      }
      const sourceFsPath = `${dir}/${this.source}`
      let sourceContent = null
      try {
        sourceContent = (await fs.readFileSync(sourceFsPath, "utf-8")).toString()
        const targetOutputBuffer = this.compileTransform(sourceContent, row)
        checksum = calculateChecksum(targetOutputBuffer)
      } catch (e) {
        const message = `lfs error : cant read ${sourceFsPath}`
        this.errorHandler(message, e)
        console.log(message, e)
      }
    }

    return checksum
  }
  async compile(row) {
    // const row = await this.model.getRow(id)
    let checksum = null
    let targetGitPath = null
    if (row) {
      let { fs, dir } = this.model.git
      if (this.baseDir) {
        dir = this.baseDir
      }
      const slug = slugify(row[this.slugField])
      const sourceFsPath = `${dir}/${this.source}`
      const outDirGitPath = `${this.outDir}/${this.prefix}/${row.id}/${slug}`

      const initOutDirSuccess = await this.initOutputDir(outDirGitPath, dir)

      if (initOutDirSuccess) {
        const outDirFsPath = `${dir}/${outDirGitPath}`
        targetGitPath = `${outDirGitPath}/index.html`
        const targetFsPath = `${dir}/${targetGitPath}`

        console.log(`compiler starting compile ${targetGitPath}`)

        let sourceContent = null
        try {
          sourceContent = (await fs.readFileSync(sourceFsPath, "utf-8")).toString()
        } catch (e) {
          const message = `lfs error : cant read ${sourceFsPath}`
          this.errorHandler(message, e)
          console.log(message, e)
        }
        if (sourceContent) {
          // console.log(sourceContent)
          const targetOutputBuffer = this.compileTransform(sourceContent, row)
          checksum = calculateChecksum(targetOutputBuffer)
          try {
            console.log(`Write ${targetFsPath}`)
            await fs.writeFileSync(targetFsPath, targetOutputBuffer)
          } catch (e) {
            const message = `lfs error: cant write ${targetFsPath}`
            console.log(message, e)
          }
          // console.log(targetOutputBuffer)
        } else {
          const message = `compiler error: empty source`
          this.errorHandler(message)
          console.log(message)
        }
      } else {
        const message = `compile error : cant initialize ${outDirGitPath}`
        this.errorHandler(message)
        console.log(message)
      }
    }
    return { checksum, targetGitPath }
  }
}

export default HTMLCompiler
