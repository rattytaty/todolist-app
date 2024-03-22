export const convertDate = (dateToConvert: string) => {
    const [date, time] = dateToConvert.split("T")
    const [year, month, day] = date.split("-")
    const shortDate = `${day}.${month}`
    const longDate = `${day}.${month}.${year}`
    const convertedTime = time.slice(0, 5)
    return {shortDate, longDate, convertedTime}
}