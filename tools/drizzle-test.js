import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()
const git={
	fs,
	dir: path.join(CWD,"src")
}
import MBeritaRw from "../src/global/git/orm/rw/models/MBeritaRw"

const mBeritaRw = new MBeritaRw(git)



const main=async()=>{
	console.log(`-------HELLO-${new Date}----`)
	// console.log(git)
	await mBeritaRw.initOrm()
	const countAll = await mBeritaRw.count()
	console.log({countAll})
	const countWithFilter = await mBeritaRw.count({author:"Admin"})
	console.log({countWithFilter})
	// const rows=mBeritaRw.getAll()
	/*
	const updates=[]
	for(const row of rows){
		let content = JSON.parse(row.content)
		const {blocks}=content
		// updates.push({id:row.id,content:JSON.stringify(blocks)})
		// updates[row.id]=
		// console.log(blocks)
	}
	*/
	// console.log(updates)
	// await mBeritaRw.updateContentRows(updates)
	// await mBeritaRw.commit()
}

main()