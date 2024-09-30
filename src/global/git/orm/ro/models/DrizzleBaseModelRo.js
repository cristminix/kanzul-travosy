import { createDbWorker } from "sql.js-httpvfs"
const workerUrl = new URL("sql.js-httpvfs/dist/sqlite.worker.js", import.meta.url)
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url)
import * as schema from "../../schema/schema"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"

/** @typedef { import('./types.d').Stmt }
Stmt */
class Stmt {
  db = null
  prepareArgs = []
  result = null
  cursorValue = 0
  constructor(db, prepareArgs) {
    this.db = db
    this.prepareArgs = prepareArgs
  }
  async bind() {
    // if (!this.db) return
    // console.log('stmt.bind()',this.prepareArgs,arguments)
    const sql = this.prepareArgs[0]
    console.log(sql)
    // @ts-ignore
    const [result] = await this.db.exec(sql)
    this.result = result
    // console.log(this.result)
  }
  step() {
    console.log("stmt.step()")
    const { values } = this.result

    console.log(this.cursorValue, values)

    if (this.cursorValue < values.length) {
      this.cursorValue += 1
      return true
    }
    return false
    // const values = arguments[0]
    // return this.result.values
  }
  get() {
    console.log("stmt.get()")

    const { values } = this.result

    return values[this.cursorValue]
  }
  async free() {
    console.log("stmt.free()", arguments)
  }
}
class DBWrapper {
  sqlite = null
  stmt = null
  db = null
  constructor(worker) {
    this.sqlite = worker.worker
    this.db = worker.db

    // console.log(this.worker)
  }

  prepare() {
    // console.log(arguments)
    // this.stmt = {

    // }
    // const sql = [...arguments].join(" ")
    this.stmt = new Stmt(this.db, arguments)
    // console.log(this.stmt)
    return this.stmt
  }
}
class DrizzleBaseModelRo {
  dbUrl = null
  schema = null
  maxByteToRead = 10 * 1024 * 1024
  config = null
  requestChunkSize = 4096
  worker = null
  db = null
  ready = false
  useSqlCloud = false
  sqlCloudDatabase = ""
  sqlCloudApiKey = ""
  sqlCloudApiEndpoint = ""

  resetWorker() {
    this.worker.worker.bytesRead = 0
  }
  constructor() {
    // this.setup()
  }
  setup() {
    this.config = {
      from: "inline",
      config: {
        serverMode: "full",
        requestChunkSize: this.requestChunkSize,
        url: this.dbUrl,
      },
    }
  }
  async initOrm(callback = (f) => f) {
    this.setup()
    this.worker = await createDbWorker([this.config], workerUrl.toString(), wasmUrl.toString(), this.maxByteToRead)
    const dbWrapper = new DBWrapper(this.worker)
    // console.log()
    this.db = drizzle(dbWrapper, { schema })
    this.ready = true
    callback(this)
  }

  async drizzleQuery(drizzlePrepared) {
    const { query } = drizzlePrepared.prepare()
    const { sql, params } = query
    // console.log({ query, sql, params })
    let result = null
    if (this.useSqlCloud) {
      const sqlQuery = this.prepareQuery(sql, params)
      const results = await this.fetchSqlCloudQuery(sqlQuery)
      const { data } = results
      //   console.log({ cloudResult })
      result = data
    } else {
      result = await this.worker.db.query(sql, params)
    }
    // console.log({ result })
    this.resetWorker()
    return result
  }
  async getAll() {
    return await this.drizzleQuery(this.db.select().from(this.schema).limit(6))
  }
  prepareQuery(query, params) {
    let index = 0
    return query.replace(/\?/g, () => {
      if (index < params.length) {
        // Escaping or formatting can be done here if necessary
        return params[index++]
      } else {
        throw new Error("Not enough parameters provided for query.")
      }
    })
  }
  async fetchSqlCloudQuery(sqlQuery = "") {
    const apiEndpoint = `${this.sqlCloudApiEndpoint}?apikey=${this.sqlCloudApiKey}&database=${this.sqlCloudDatabase}&sql=${sqlQuery}`

    let responseData = null
    try {
      responseData = await fetch(apiEndpoint, {
        method: "GET",
        mode: "cors",
      }).then((r) => r.json())
    } catch (error) {}

    return responseData
  }
}

export default DrizzleBaseModelRo
