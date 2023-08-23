export function formattedDate (rawDate) {
  const utcDate = new Date(rawDate)

  // Extract day, month, and year components
  const day = utcDate.getUTCDate()
  const month = utcDate.getUTCMonth() + 1 // Month is zero-indexed
  const year = utcDate.getUTCFullYear()

  // Format day and month to have leading zeroes if necessary
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month

  // Format the date as DD/MM/YYYY
  return `${formattedMonth}/${formattedDay}/${year}`
}
