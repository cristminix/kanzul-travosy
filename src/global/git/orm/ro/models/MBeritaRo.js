import DrizzleModelRo from './DrizzleModelRo';
import {BeritaSchema} from "../../schema/schema"
import {getBlocksReadingTime} from "@/global/fn/getBlocksReadingTime"

class MBeritaRo extends DrizzleModelRo{
	table="berita"
	dbUrl="/web/data/berita/berita.db"
	schema=BeritaSchema
	defaultOrder = { dateUpdated: "asc" }
	
	async getReadingTime(id){
		let readingTime
		const row = await this.get(id)
		if(row){
			readingTime = row.readingTime
			try{
				const blocks = JSON.parse(row.content)
				readingTime = getBlocksReadingTime(blocks)
			}catch(e){}
		}
		return readingTime
	}
}

export default MBeritaRo