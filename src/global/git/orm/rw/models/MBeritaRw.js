import DrizzleModelRw from './DrizzleModelRw';
import {BeritaSchema} from "../../schema/schema"
import { inArray, sql } from 'drizzle-orm';
// import Compiler from './Compiler';
import CONFIG from "../../../../../config.json" assert {type:'json'}
const BASE_URL = CONFIG.BASE_URL
class MBeritaRw extends DrizzleModelRw{
	defaultOrder = { dateUpdated: "asc" }
	path="web/data/berita/berita.db"
	schema=BeritaSchema

	compiler={
		source:"baca-berita/index.html",
		outDir:"berita",
		prefix:"baca"
	}
	// compiler=null
		
	// constructor(git){
	// 	super(git)
	// 	this.compiler = new Compiler(this,this.compilerConfig)
	// }
	compile(parser,row){
		parser.setTitle(row.title)
		parser.set('keywords',row.title.toLowerCase(),'name')
		parser.set('description',row.headline,'name')
		parser.set('id',row.id,'name')
		parser.set('slug',row.slug,'name')

		parser.set('og:description',row.headline,'property')
		parser.set('og:title',row.title,'property')
		parser.set('og:URL',`${BASE_URL}/berita/baca/${row.id}/${row.slug}/`,'property')
		parser.set('og:image',`${BASE_URL}/assets/images/berita/covers/${row.cover}`,'property')

		return parser.save()
	}
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