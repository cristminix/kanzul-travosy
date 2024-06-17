import DrizzleModelRo from './DrizzleModelRo';
import {BeritaSchema} from "../../schema/schema"
class MBeritaRo extends DrizzleModelRo{
	table="berita"
	dbUrl="/web/data/berita/berita.db"
	schema=BeritaSchema
	defaultOrder = { dateUpdated: "asc" }
	
}

export default MBeritaRo