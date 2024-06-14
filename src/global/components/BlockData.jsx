import Output from "editorjs-react-renderer"
import { isBlockData } from "@/global/fn/isBlockData"

import { arrayToBlockData } from "@/global/fn/arrayToBlockData"
const config = {
  paragraph: {
    disableDefaultStyle: true,
  },
  image: {
    disableDefaultStyle: true,
  },
  video: {
    disableDefaultStyle: true,
  },
}
const BlockData = ({ className, data, limit, start }) => {
  if (!isBlockData(data)) {
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

  return (
    <div className={`block-data ${className}`}>
      <Output data={arrayToBlockData(newData)} config={config} />
    </div>
  )
}

export default BlockData
