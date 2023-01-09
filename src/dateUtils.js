const getNextDayFormatted = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return getFormattedDate(nextDay);
}
const getYesterdayFormatted = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getFormattedDate(yesterday);
}

const getTodayFormatted = () => {
  return getFormattedDate(new Date());
}

const getFormattedDate = (date) => {
  const yyyy = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return yyyy + "-" + padLeftZero(month) + "-" + padLeftZero(day);
}

const padLeftZero = (string) => {
  return ("" + string).length === 1 ? "0" + string : string;
}

module.exports = {
  getNextDayFormatted,
  getFormattedDate,
  getTodayFormatted,
  getYesterdayFormatted,
  padLeftZero,
}