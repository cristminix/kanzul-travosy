import fs from "node:fs"
import path from "node:path"
const CWD = process.cwd()
const git = {
  fs,
  dir: path.join(CWD, "dist"),
}
import MBeritaRw from "../src/global/git/orm/rw/models/MBeritaRw"

const mBeritaRw = new MBeritaRw(git)

const fixBeritaBlocks = async () => {
  const list = mBeritaRw.getAll()
  const updates = []
  for (const row of list) {
    let { id, content } = row
    content = JSON.parse(content)
    const { blocks } = content
    content = JSON.stringify(blocks)
    updates.push({ id, content })
    // console.log(blocks)
  }
  await mBeritaRw.updateContentRows(updates)
  await mBeritaRw.commit()
}

const main = async () => {
  console.log(`-----------${new Date()}---------------`)
  // console.log(git)
  await mBeritaRw.initOrm()
  // await fixBeritaBlocks()
  /*	const countAll = await mBeritaRw.count()
	console.log({countAll})
	const countWithFilter = await mBeritaRw.count({author:"Admin"})
	console.log({countWithFilter})

	const list = await mBeritaRw.getList()
	console.log({list})


	const listWithSearch = await mBeritaRw.getList({
		// search:{
		// 	type:"all",
		// 	field:"title",
		// 	query:"anak"
		// },
		filter:{
			author:"Admin"
		},
		order:{title:'asc'},
		// limit:2
	})
	console.log({listWithSearch,display:listWithSearch.records.map(item=>item.title)})
	const states = await mBeritaRw.getState({
		search:{
			type:"all",
			field:"title",
			query:"anak"
		},
		// filter:{
		// 	author:"Admin"
		// },
		// order:{title:'asc'},
		// page:1,
		// limit:2
	})
	console.log(states)
	/*try{
		const row = await mBeritaRw.getRow({id:1})
		console.log({row})
	}catch(e){
		console.log(e)
	}

	// const rows=mBeritaRw.getAll()
	
	const updates=[]
	for(const row of rows){
		let content = JSON.parse(row.content)
		const {blocks}=content
		// updates.push({id:row.id,content:JSON.stringify(blocks)})
		// updates[row.id]=
		// console.log(blocks)
	}
	
	// console.log(updates)
	// await mBeritaRw.updateContentRows(updates)
	// await mBeritaRw.commit()

	*/
}

main()
