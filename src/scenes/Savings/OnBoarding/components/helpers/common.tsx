type DATE_FORMATS = "dd-mm-yyyy" | "dd/mm/yyyy" | "mm-dd-yyyy" | "yyyy-mm-dd"

export const getAge = (d1: any) => {
  var diff = new Date().getTime() - d1.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}

export const getEndYear = (numberOfyear: number) => {
  const date = new Date().getDay()
  const month = new Date().getMonth()
  const year = new Date().getFullYear() - numberOfyear
  return `${addZero(date)}/${addZero(month)}/${year}`
}
export const formatDate = (dateValue: string, format: DATE_FORMATS) => {
  const newDate = new Date(dateValue)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const date = newDate.getDate()
  switch (format) {
    case "dd-mm-yyyy":
      return `${addZero(date)}-${addZero(month)}-${year}`
    case "dd/mm/yyyy":
      return `${addZero(date)}/${addZero(month)}/${year}`
    case "mm-dd-yyyy":
      return `${addZero(month)}-${addZero(date)}-${year}`
    case "yyyy-mm-dd":
      return `${year}-${addZero(month)}-${addZero(date)}`
  }
}
export const addZero = (value: any) => {
  return parseInt(value) < 10 ? "0" + value : value
}
