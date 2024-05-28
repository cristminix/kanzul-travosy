const error = console.error
const info = console.info
function logError(...parameters) {
  let filter = parameters.find((parameter) => {
    return (
      // Filter error because XXX
      parameter.includes("Warning: %s is deprecated in StrictMode") ||
      // Another error to filter because of YYYY
      parameter.includes("Warning:")
    )
  })
  if (!filter) error(...parameters)
}
//i18next::translator:
function logInfo(...parameters) { 
  try{
    let filter = parameters.find((parameter) => {
    return (
      // Filter error because XXX
      parameter.includes("i18next::translator:") ||
      // Another error to filter because of YYYY
      parameter.includes("i18next")
    )
  })
  if (!filter) info(...parameters)
  }catch(e){
    info(...parameters)
  }
  
}
// console.log = logInfo
console.error = logError
