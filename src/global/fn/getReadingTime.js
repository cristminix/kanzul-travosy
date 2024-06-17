import striptags from "striptags"

export function getReadingTime(text, stripTags = true) {
  if (stripTags) {
    text = striptags(text)
  }
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime
}

