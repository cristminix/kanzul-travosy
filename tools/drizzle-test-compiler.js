import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()
const GIT_REPO_DIR = path.join("C:/Users/Damar/Desktop/ACTIVE-WORKS/kanzululum-web")

const git = {
  fs,
  dir: path.join(CWD, "dist"),
  commit: () => {},
}
import MBeritaRw from "../src/global/git/orm/rw/models/MBeritaRw"
import MProdukRw from "../src/global/git/orm/rw/models/MProdukRw"
import HTMLCompiler from "../src/global/class/HTMLCompiler"

const mBeritaRw = new MBeritaRw(git)
const mProdukRw = new MProdukRw(git)
const compilerBerita = new HTMLCompiler(mBeritaRw)
const compilerProduk = new HTMLCompiler(mProdukRw)
const compileProduk = async () => {
  await mProdukRw.initOrm()
  const lists = await mProdukRw.getAll()
  for (const row of lists) {
    const result = await compilerProduk.compile(row)
    const { checksum, targetGitPath } = result
    if (checksum && targetGitPath) {
      row.compiledHash = checksum
      row.compiledPath = targetGitPath.replace(/\/index\.html$/, "")
    }
    console.log(`updates row ${row.id}`)
    try {
      await mProdukRw.update(row.id, row)
    } catch (e) {
      console.log(e)
    }
  }
  await mProdukRw.commit()
}
const compileBerita = async () => {
  await mBeritaRw.initOrm()
  const lists = await mBeritaRw.getAll()
  for (const row of lists) {
    const result = await compilerBerita.compile(row)
    const { checksum, targetGitPath } = result
    if (checksum && targetGitPath) {
      row.compiledHash = checksum
      row.compiledPath = targetGitPath.replace(/\/index\.html$/, "")
    }
    console.log(`updates row ${row.id}`)
    try {
      await mBeritaRw.update(row.id, row)
    } catch (e) {
      console.log(e)
    }
  }
  await mBeritaRw.commit()
}
const main = async () => {
  console.log(`-----------${new Date()}---------------`)

  const sqlWasmSrc = path.join(CWD, "src/web/data/sql/sql-wasm.wasm")
  const sqlWasmDstDir = path.join(CWD, "dist/web/data/sql")

  const sqlWasmDst = path.join(CWD, "dist/web/data/sql/sql-wasm.wasm")
  await fs.mkdirSync(sqlWasmDstDir, { recursive: true })
  await fs.copyFileSync(sqlWasmSrc, sqlWasmDst)

  console.log(`Compiling berita`)
  await compileBerita()
  console.log(`Compiling produk`)

  await compileProduk()
}

main()
