import DrizzleModelRo from './DrizzleModelRo';
import {ProdukSchema} from "../../schema/schema"
import {getBlocksReadingTime} from "@/global/fn/getBlocksReadingTime"

class MProdukRo extends DrizzleModelRo{
	table="produk"
	dbUrl="/web/data/produk/produk.db"
	schema=ProdukSchema
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

export default MProdukRo