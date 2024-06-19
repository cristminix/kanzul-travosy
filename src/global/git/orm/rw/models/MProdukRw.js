import DrizzleModelRw from './DrizzleModelRw';
import {ProdukSchema} from "../../schema/schema"
import { inArray, sql } from 'drizzle-orm';

class MProdukRw extends DrizzleModelRw{
	defaultOrder = { dateUpdated: "asc" }
	path="web/data/produk/produk.db"
	schema=ProdukSchema

	// constructor(git){
	// 	super(git)
	// }
	
	async updateContentRows(updates){
		const sqlChunks = [];
		const ids = [];

		sqlChunks.push(sql`(case`);

		for (const input of updates) {
		  sqlChunks.push(sql`when ${this.schema.id} = ${input.id} then ${input.content}`);
		  ids.push(input.id);
		}

		sqlChunks.push(sql`end)`);

		const finalSql = sql.join(sqlChunks, sql.raw(' '));
		// console.log(finalSql)
		await this.db.update(this.schema).set({ content: finalSql }).where(inArray(this.schema.id, ids));
	}/**/
}

export default MProdukRw