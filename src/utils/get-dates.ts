// Seba Illingworth's answer in "Get a list of dates between two dates using javascript"
export function getDates(startDate, endDate) {
  const days = [],
    months = new Set(),
    years = new Set();

  const dateMove = new Date(startDate);
  let date = startDate;

  while (date < endDate) {
    date = dateMove.toISOString().slice(0, 10);
    months.add(date.slice(0, 7));
    years.add(date.slice(0, 4));
    days.push(date);
    dateMove.setDate(dateMove.getDate() + 1); // increment day
  }
  //return { years: [...years], months: [...months], days }; // return arrays
  return days;
}
