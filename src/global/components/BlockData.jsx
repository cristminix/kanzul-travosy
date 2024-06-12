import Output from "editorjs-react-renderer"
import {isBlockData} from "@/global/fn/isBlockData"

import { arrayToBlockData } from "@/global/fn/arrayToBlockData"

const BlockData = ({ data, limit, start }) => {
  if(!isBlockData(data)){
    return null
  }
  const dataLength = data.length
  let newData = []
  try {
    if (start) {
      newData = data.slice(start, dataLength)
    }
    if (limit) {
      newData = data.slice(0, limit)
    } else {
      newData = data
    }
  } catch (e) {
    console.log(e)
  }

  return <Output data={arrayToBlockData(newData)} />
}

export default BlockData