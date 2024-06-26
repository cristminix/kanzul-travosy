import { crc32 } from "crc"
import { v4 } from "uuid"
export function crc32id(salt = null) {
  //   const dt = new Date()
  const tm = v4()
  //   console.log(tm)
  const unique = tm.toString() + (!salt ? salt : "")
  return crc32(unique).toString(16)
}
