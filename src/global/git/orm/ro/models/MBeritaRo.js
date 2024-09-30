import DrizzleModelRo from "./DrizzleModelRo"
import { BeritaSchema } from "../../schema/schema"
import { getBlocksReadingTime } from "@/global/fn/getBlocksReadingTime"

class MBeritaRo extends DrizzleModelRo {
  table = "berita"
  dbUrl = "/db/berita.json"
  //   dbUrl = "/database/berita.db"
  schema = BeritaSchema
  defaultOrder = { dateUpdated: "asc" }
  // sqlcloud vars
  // "https://cp8tg0tbik.sqlite.cloud:8090/v2/weblite/sql?apikey=wpoPHH3p97nOorGQadfwaOAY2Kcyup6zqXpODNWWP4Q&database=berita.db
  useSqlCloud = true

  sqlCloudDatabase = "berita.db"
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

export default MBeritaRo
