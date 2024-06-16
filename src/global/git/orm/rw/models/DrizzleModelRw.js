import initSqlJs, { SqlValue } from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"
import { calculateTotalPages } from "@/global/fn/calculateTotalPages"
import { calculateOffset } from "@/global/fn/calculateOffset"
import DrizzleBaseModel from "./DrizzleBaseModel"

class DrizzleModelRw extends DrizzleBaseModel {
	defaultOrder = { dateUpdated: "asc" }

	
	async update(pk, row) {
		delete row[this.pk]
		await this.db.update(this.schema).set(row).where(eq(this.schema[this.pk], pk))
	}
	async delete(pk, row) {
		await db.delete(this.schema).where(eq(this.schema[this.pk], pk))
	}
	async create(pk, row) {
		await await db.insert(this.schema).values(row)
	}
}

export default DrizzleModelRw