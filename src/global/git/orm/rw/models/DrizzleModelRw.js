import initSqlJs, { SqlValue } from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"

import DrizzleBaseModel from "./DrizzleBaseModel"

class DrizzleModelRw extends DrizzleBaseModel {
	async getState(limit = 5, page = null, filter = null, search=null) {
		if (this.isValidFilter(filter)) {
		}
	}
	async update(pk,row){

	}
	async delete(pk,row){

	}
	async create(pk,row){

	}
}

export default DrizzleModelRw