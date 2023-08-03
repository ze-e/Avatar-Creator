export function formattedDate (rawDate) {
  const date = new Date(rawDate)
  return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
}
