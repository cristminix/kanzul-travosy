import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()
const GIT_REPO_DIR = path.join("C:/Users/Damar/Desktop/ACTIVE-WORKS/kanzululum-web")

const git={
	fs,
	dir: GIT_REPO_DIR
}
import MBeritaRw from "../src/global/git/orm/rw/models/MBeritaRw"
import Compiler from "../src/global/git/orm/rw/models/Compiler"

const mBeritaRw = new MBeritaRw(git)
const compiler = new Compiler(mBeritaRw)


// const compilerBaseDir = path.join(CWD,"dist")

const main=async()=>{
	console.log(`-----------${new Date}---------------`)
	await mBeritaRw.initOrm()
	const pk = 1
	// const row = await mBeritaRw.getRow(pk)
	await compiler.compile(pk)
}

main()