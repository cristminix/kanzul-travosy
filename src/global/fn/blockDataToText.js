import { isBlockData } from "./isBlockData"

export function blockDataToText(data, limit = 1, start = null) {
  if (isBlockData(data)) {
    let newData = []
    const dataLength = data.length

    try {
      if (start) {
        newData = data.slice(start, dataLength)
      }
      if (limit) {
        newData = data.slice(0, limit)
      } else {
        newData = data
      }
      let str = ""
      for (const block of newData) {
        const { data } = block
        str += `${data.text} `
      }
      return str
    } catch (e) {
      console.log(e)
    }
  }
  return ""
}
