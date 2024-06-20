import DrizzleModelRw from './DrizzleModelRw';
import {BeritaSchema} from "../../schema/schema"
import { inArray, sql } from 'drizzle-orm';
// import Compiler from './Compiler';

class MBeritaRw extends DrizzleModelRw{
	defaultOrder = { dateUpdated: "asc" }
	path="web/data/berita/berita.db"
	schema=BeritaSchema

	compiler={
		source:"lihat-produk/index.html",
		outDir:"produk"
	}
	// compiler=null
		
	// constructor(git){
	// 	super(git)
	// 	this.compiler = new Compiler(this,this.compilerConfig)
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

export default MBeritaRw