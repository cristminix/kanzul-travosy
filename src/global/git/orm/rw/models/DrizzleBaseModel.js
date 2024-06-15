import initSqlJs, { SqlValue } from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"
// import createSqlWasm from "sql-wasm"
import { isBrowser } from "@/global/fn/isBrowser"
import { calculateTotalPages } from "@/global/fn/calculateTotalPages"
import { calculateOffset } from "@/global/fn/calculateOffset"

class Logger {
	info() {}
	error() {}
	warning() {}
}

class DrizzleBaseModel {
	wasmPath = "web/data/sql/sql-wasm.wasm"
	pk = "id"
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
	isValidOrder(order) {
		const validValue = typeof order === "object" && order !== null
		if (!validValue) return false
		const allFields = Object.keys(this.schema)
		const fields = Object.keys(order)
		if (fields.length > 1) {
			console.log(`Warning: order field > 1 left is unused`)
		}
		if (fields.length > 0) {
			const [field] = fields
			const direction = order[field]

			return allFields.includes(field) && ["asc", "desc"].includes(direction)
		}
		return false
	}
	isValidFilter(filter) {
		return typeof filter === "object" && filter !== null
	}

	isValidSearch(search) {
		const validValue = typeof search === "object" && search !== null
		if (!validValue) return false
		const validSearchQuery = typeof search.query === "string" && search.query.length > 0
		const validSearchType = ["single", "all"].includes(search.type)
		const searchType = validSearchType ? search.type : "all"
		let checkSearchField = true
		const allFields = Object.keys(this.schema)

		if (searchType === "single") {
			checkSearchField = allFields.includes(search.field)
		}
		return validSearchQuery && checkSearchField
	}
	isValidPage(page) {
		return page && page !== null
	}
	addQueryOrder(order) {
		const fields = Object.keys(order)
		const [field] = fields
		const direction = order[field]
		const orderBy = direction === "asc" ? asc(this.schema[field]) : desc(this.schema[field])
		return orderBy
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
			} else {
				console.log(`invalid filter ${field} not exists in [${allFields.join(",")}]`)
			}
		}

		return condition
	}

	async count(filter = null, search = null) {
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
	async commit(push = false) {
		const arrBuffer = this.sqldb.export()
		console.log(`Write ${this.path}`)
		try {
			await this.fs.writeFileSync(this.getDbPath(), arrBuffer)
		} catch (e) {
			console.log(`lfs:error cant write ${this.path}`, e)
		}
		if (push) {
		}
	}
	getDbPath() {
		return `${this.dir}/${this.path}`
	}
	getWasmPath() {
		return `${this.dir}/${this.wasmPath}`
	}
	async initOrm() {
		if (this.ready) return

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
	async getRecords(orderBy) {
		return await this.db.select().from(this.schema).orderBy(orderBy)
	}
	async getRecords_withPage(orderBy, limit, offset) {
		return await this.db.select().from(this.schema).orderBy(orderBy).limit(limit).offset(offset)
	}
	async getLRecordsWithFilter(orderBy, condition) {
		await this.db.select().from(this.schema).where(condition).orderBy(orderBy)
	}
	async getLRecordsWithFilter_withPage(orderBy, limit, offset, condition) {
		await this.db.select().from(this.schema).where(condition).orderBy(orderBy).limit(limit).offset(offset)
	}
	async getLRecordsWithSearch(orderBy, searchType, searchField, searchQuery) {
		if (searchType === "single") {
			records = await this.db
				.select()
				.from(this.schema)
				.where(like(this.schema[searchField], `%${searchQuery}%`))
				.orderBy(orderBy)
		} else {
			records = await this.db
				.select()
				.from(this.schema)
				.where(
					or(
						like(this.schema.title, `%${searchQuery}%`),
						like(this.schema.content, `%${searchQuery}%`),
						like(this.schema.author, `%${searchQuery}%`),
					),
				)
				.orderBy(orderBy)
		}
	}
	async getLRecordsWithSearch_withPage(orderBy, limit, offset, searchType, searchField, searchQuery) {
		if (searchType === "single") {
			records = await this.db
				.select()
				.from(this.schema)
				.where(like(this.schema[searchField], `%${searchQuery}%`))
				.orderBy(orderBy)
				.limit(limit)
				.offset(offset)
		} else {
			records = await this.db
				.select()
				.from(this.schema)
				.where(
					or(
						like(this.schema.title, `%${searchQuery}%`),
						like(this.schema.content, `%${searchQuery}%`),
						like(this.schema.author, `%${searchQuery}%`),
					),
				)
				.orderBy(orderBy)
				.limit(limit)
				.offset(offset)
		}
	}
	async getRow(pk) {
		let condition
		if (typeof pk === "object" && pk !== null) {
			const objectParam = pk
			const validFilter = this.isValidFilter(objectParam)
			if (!validFilter) return null
			condition = this.addQueryFilter(objectParam)
		} else {
			condition = this.addQueryFilter({ [this.pk]: pk })
		}
		const result = this.db.select().from(this.schema).where(condition)

		return result.get(0)
	}
	async getList(limit = 5, page = 1, order = null, filter = null, search = null) {
		if (typeof limit === "object" && limit !== null) {
			const objectParam = limit

			search = objectParam.search ?? null
			limit = objectParam.limit ?? 5
			order = objectParam.order ?? null
			filter = objectParam.filter ?? null
			page = objectParam.page ?? 1
		}
		// console.log({limit})

		const totalRecords = await this.countAll()
		const totalPages = calculateTotalPages(totalRecords, limit)

		let records = []

		const defaultOrder = { dateUpdated: "asc" }
		let orderBy = this.addQueryOrder(this.isValidOrder(order) ? order : defaultOrder)

		// console.log({validOrder:this.isValidOrder(order)})

		const validSearch = this.isValidSearch(search)
		let searchQuery, searchType, searchField
		if (validSearch) {
			searchType = search.type
			searchQuery = search.query
			searchField = search.field
		}

		const hasFilter = this.isValidFilter(filter)
		const hasSearch = validSearch
		const hasPage = this.isValidPage(page)

		// priority is search,filter,default
		const offset = calculateOffset(page, limit)

		if (hasSearch) {
			if (hasPage) {
				records = await this.getRecordsWithSearch_withPage(orderBy, limit, offset, searchType, searchField, searchQuery)
			} else {
				records = await this.getRecordstWithSearch(orderBy, searchType, searchField, searchQuery)
			}
		} else if (hasFilter) {
			let condition = this.addQueryFilter(filter)

			if (hasPage) {
				records = await this.getRecordstWithFilter_withPage(orderBy, limit, offset, condition)
			} else {
				records = await this.getRecordstWithFilter(orderBy, condition)
			}
		} else {
			if (hasPage) {
				records = await this.getRecords_withPage(orderBy, limit, offset)
			} else {
				records = await this.getRecords(orderBy)
			}
		}

		return { limit, totalPages, totalRecords, recordCount: records.length, records }
	}
}

export default DrizzleBaseModel