export function pluralToSingular(word) {
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y"
  } else if (word.endsWith("es")) {
    return word.slice(0, -2)
  } else if (word.endsWith("s")) {
    return word.slice(0, -1)
  }
  return word // Return the original word if no rule matches
}
