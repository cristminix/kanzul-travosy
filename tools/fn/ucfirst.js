export function ucfirst(str) {
  if (!str) return str // Handle empty string or null input
  return str.charAt(0).toUpperCase() + str.slice(1)
}
