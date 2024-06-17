import {getReadingTime} from "./getReadingTime"

export function getBlocksReadingTime(blocks){
  let textContent = ''

  for(const block of blocks){
    if(block.data){
      const {text} = block.data
      if(text){
        textContent += text 
      }
    }
  }
  return getReadingTime(textContent)
}