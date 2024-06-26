export function slugify(str) {
  if(!str){
    str=""
  }
  const words = str.replace(/\W+/g, " ").split(" ")
  return words.join("-").toLowerCase()
}
