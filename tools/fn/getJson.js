import fs from "node:fs"
export const getJson = async (pathLoc) => {
  try {
    const buffer = fs.readFileSync(pathLoc, "utf-8")
    const json = JSON.parse(buffer)
    return json
  } catch (err) {
    console.error(err)
  }
  return {}
}
