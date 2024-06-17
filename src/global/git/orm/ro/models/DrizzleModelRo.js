import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"
import { calculateTotalPages } from "@/global/fn/calculateTotalPages"
import { calculateOffset } from "@/global/fn/calculateOffset"
import DrizzleBaseModelRo from "./DrizzleBaseModelRo"

class DrizzleModelRo extends DrizzleBaseModelRo {
	pk = "id"
	searchFields=[]
	selectList={}

	buildSelectList(excludeFields=[]){
		const allFields=Object.keys(this.schema)
		this.selectList={}
		for(const field of allFields){
			if(!excludeFields.includes(field)){
				this.selectList[field]=this.schema[field]
			}
		}
	}

	getSearchFields(){
		const allFields = Object.keys(this.schema)
		
		if(this.searchFields.length === 0){
			for(const field of allFields){
				if(this.schema[field].dataType === 'string')
				this.searchFields.push(field)		
			}
		}

		return this.searchFields
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
		let conditionArr = []

		for (const field of fields) {
			if (allFields.includes(field)) {
				conditionArr.push(eq(this.schema[field],filter[field]))
				// break
			} else {
				console.log(`invalid filter ${field} not exists in [${allFields.join(",")}]`)
			}
		}
		if(conditionArr.length>0)
			return and.apply(this,conditionArr)
		return null
	}
	addQuerySearch(searchFields,searchQuery){
		const likes = []
		for(const field of searchFields){
			likes.push(like(this.schema[field],`%${searchQuery}%`))
		}
		if(likes.length>0)
			return or.apply(this,likes)
		return null
	}
	getListParam(limit, page, order, filter, search) {
		if (typeof limit === "object" && limit !== null) {
			const objectParam = limit

			limit = objectParam.limit ?? 5
			page = objectParam.page ?? 1
			order = objectParam.order ?? null
			filter = objectParam.filter ?? null
			search = objectParam.search ?? null
		}

		const defaultOrder = this.defaultOrder ?? { [this.pk]: "asc" }
		const orderBy = this.addQueryOrder(this.isValidOrder(order) ? order : defaultOrder)

		const validSearch = this.isValidSearch(search)

		let searchQuery, searchType, searchField
		if (validSearch) {
			searchType = search.type
			searchField = search.field
			searchQuery = search.query
		}
		const hasFilter = this.isValidFilter(filter)
		const hasSearch = validSearch
		const hasPage = this.isValidPage(page)
		const hasSearchAndFilter = hasFilter && hasSearch
		// priority is search,filter,default
		return {
			limit,
			page,
			order,
			filter,
			search,
			search,
			orderBy,
			validSearch,
			searchType,
			searchField,
			searchQuery,
			hasFilter,
			hasSearch,
			hasPage,
			hasSearchAndFilter,
		}
	}
	async count(filter = null, search = null) {
		let result = null
		if (this.isValidFilter(filter)) {
			let condition = this.addQueryFilter(filter)
			result = await this.drizzleQuery(this.db
				.select({ count: count(this.schema.id) })
				.from(this.schema)
				.where(condition)
				)
			const [row] = result
			if (row) return row[Object.keys(row).at(0)]
			return 0
		}

		return await this.countAll()
	}
	async countAll() {
		const result = await this.drizzleQuery(this.db.select({ count: count() }).from(this.schema))
		console.log(result)
		const [row] = result
		if (row) return row[Object.keys(row).at(0)]
		return 0
	}
	async getRecords(orderBy) {
		return await this.drizzleQuery(this.db.select(this.selectList).from(this.schema).orderBy(orderBy))
	}
	async getRecords_withPage(orderBy, limit, offset) {
		return await this.drizzleQuery(this.db.select(this.selectList).from(this.schema).orderBy(orderBy).limit(limit).offset(offset))
	}
	async getRecordsWithFilter(orderBy, condition) {
		return await this.drizzleQuery(this.db.select(this.selectList).from(this.schema).where(condition).orderBy(orderBy))
	}
	async getRecordsWithFilter_withPage(orderBy, limit, offset, condition) {
		return await this.drizzleQuery(
			this.db.select(this.selectList).from(this.schema).where(condition).orderBy(orderBy).limit(limit).offset(offset),
		)
	}
	async getRecordsWithSearch(orderBy, searchType, searchField, searchQuery) {
		let records = []

		if (searchType === "single") {
			records = await this.drizzleQuery(
				this.db
					.select()
					.from(this.schema)
					.where(like(this.schema[searchField], `%${searchQuery}%`))
					.orderBy(orderBy),
			)
		} else {
			const searchFields = this.getSearchFields()
			const searchCondition = this.addQuerySearch(searchFields, searchQuery)
			records = await this.drizzleQuery(this.db.select(this.selectList).from(this.schema).where(searchCondition).orderBy(orderBy))
		}
		return records
	}

	async getRecordsWithSearch_withPage(orderBy, limit, offset, searchType, searchField, searchQuery) {
		let records = []
		if (searchType === "single") {
			records = await this.drizzleQuery(
				this.db
					.select()
					.from(this.schema)
					.where(like(this.schema[searchField], `%${searchQuery}%`))
					.orderBy(orderBy)
					.limit(limit)
					.offset(offset),
			)
		} else {
			const searchFields = this.getSearchFields()
			const searchCondition = this.addQuerySearch(searchFields, searchQuery)
			records = await this.drizzleQuery(
				this.db.select(this.selectList).from(this.schema).where(searchCondition).orderBy(orderBy).limit(limit).offset(offset),
			)
		}
		return records
	}
	async getList(_limit = 5, _page = 1, _order = null, _filter = null, _search = null) {
		let {
			limit,
			page,
			order,
			filter,
			search,
			orderBy,
			validSearch,
			searchType,
			searchField,
			searchQuery,
			hasFilter,
			hasSearch,
			hasPage,
			hasSearchAndFilter,
		} = this.getListParam(_limit, _page, _order, _filter, _search)

		const totalRecords = await this.countAll()
		const totalPages = calculateTotalPages(totalRecords, limit)

		let records = []

		const offset = calculateOffset(page, limit)
		this.buildSelectList(['content'])
		if (hasSearch) {
			if (hasPage) {
				records = await this.getRecordsWithSearch_withPage(orderBy, limit, offset, searchType, searchField, searchQuery)
			} else {
				records = await this.getRecordsWithSearch(orderBy, searchType, searchField, searchQuery)
			}
		} else if (hasFilter) {
			let condition = this.addQueryFilter(filter)

			if (hasPage) {
				// console.log("here")
				records = await this.getRecordsWithFilter_withPage(orderBy, limit, offset, condition)
			} else {
				records = await this.getRecordsWithFilter(orderBy, condition)
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

export default DrizzleModelRo