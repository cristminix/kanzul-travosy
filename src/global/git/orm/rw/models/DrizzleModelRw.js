import initSqlJs, { SqlValue } from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and } from "drizzle-orm"
import createSqlWasm from "sql-wasm"
import { isBrowser } from "@/global/fn/isBrowser"
class Logger {
	info() {}
	error() {}
}

class DrizzleModelRw {
	wasmPath = "web/data/sql/sql-wasm.wasm"

	path = null
	git = null
	fs = null
	schema = null
	db = null
	logger = null
	ready = false
	dir = null
	sqldb = null

	constructor(git) {
		this.git = git
		this.fs = git.fs
		this.dir = git.dir
	}
	isValidFilter(filter) {
		return typeof filter === "object" && filter !== null
	}
	addQueryFilter(filter) {
		const allFields = Object.keys(this.schema)
		const fields = Object.keys(filter)
		if (fields.length > 1) {
			console.log(`Warning: filter field > 1 left is unused`)
		}
		let condition = null
		for (const field of fields) {
			if (allFields.includes(field)) {
				condition = sql`${this.schema[field]} = ${filter[field]}`
				break
			}else{
				console.log(`invalid filter ${field} not exists in [${allFields.join(',')}]`)
			}
		}

		return condition
	}
	async getState(limit = 5, page = null, filter = null) {
		if (this.isValidFilter(filter)) {
		}
	}
	async getList(limit = 5, page = 1, filter = null) {
		if (this.isValidFilter(filter)) {
		}
	}
	async count(filter = null) {
		let result = null
		if (this.isValidFilter(filter)) {
			let condition = this.addQueryFilter(filter)
			result = await this.db
				.select({ count: count(this.schema.id) })
				.from(this.schema)
				.where(condition)
			const [row] = result
			if (row) return row.count
			return 0
		}

		return await this.countAll()
	}
	async countAll() {
		const result = await this.db.select({ count: count() }).from(this.schema)
		const [row] = result
		if (row) return row.count
		return 0
	}
	async commit() {
		const arrBuffer = this.sqldb.export()
		console.log(`Write ${this.path}`)
		try {
			await this.fs.writeFileSync(this.getDbPath(), arrBuffer)
		} catch (e) {
			console.log(`lfs:error cant write ${this.path}`, e)
		}
	}
	getDbPath() {
		return `${this.dir}/${this.path}`
	}
	getWasmPath() {
		return `${this.dir}/${this.wasmPath}`
	}
	async initOrm() {
		const dbGitPath = this.getDbPath()
		const sqlWasmGitPath = this.getWasmPath()
		console.log(`orm:try to read ${dbGitPath}`)
		try {
			const filebuffer = await this.fs.readFileSync(dbGitPath)

			const sqlPromise = await initSqlJs({
				locateFile: (file) => (isBrowser() ? `https://sql.js.org/dist/${file}` : sqlWasmGitPath),
			})

			this.sqldb = new sqlPromise.Database(filebuffer)
			const db = drizzle(this.sqldb)
			this.db = db
			this.ready = true
		} catch (e) {
			console.error(e)
		}
	}

	getAll() {
		return this.db.select().from(this.schema).all()
	}
}

export default DrizzleModelRw