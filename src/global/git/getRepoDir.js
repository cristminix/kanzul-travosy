export const getRepoDir = (url) => {
  let urlSplit = url.split("/")
  const dir = urlSplit[urlSplit.length - 1]
  return `/${dir}`
}