import DrizzleModelRo from "./DrizzleModelRo"
import { ProdukSchema } from "../../schema/schema"
import { getBlocksReadingTime } from "@/global/fn/getBlocksReadingTime"

class MProdukRo extends DrizzleModelRo {
  table = "produk"
  dbUrl = "/db/produk.json"
  schema = ProdukSchema
  defaultOrder = { dateUpdated: "asc" }
  useSqlCloud = true

  sqlCloudDatabase = "produk.db"
  sqlCloudApiKey = "wpoPHH3p97nOorGQadfwaOAY2Kcyup6zqXpODNWWP4Q"
  sqlCloudApiEndpoint = "https://cp8tg0tbik.sqlite.cloud:8090/v2/weblite/sql"
  async getReadingTime(id) {
    let readingTime
    const row = await this.get(id)
    if (row) {
      readingTime = row.readingTime
      try {
        const blocks = JSON.parse(row.content)
        readingTime = getBlocksReadingTime(blocks)
      } catch (e) {}
    }
    return readingTime
  }
}

export default MProdukRo
