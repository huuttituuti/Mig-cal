import { getDates } from './get-dates';

export function getNthDaysByNumber(startDay: string, nthDay: string) {
  const dateYear = new Intl.DateTimeFormat('fi', { year: 'numeric' }).format(new Date());
  const dateMonth = new Intl.DateTimeFormat('fi', { month: '2-digit' }).format(new Date());
  const dateDay = new Intl.DateTimeFormat('fi', { day: '2-digit' }).format(new Date());
  const todayDate = `${dateYear}-${dateMonth}-${dateDay}`;

  //console.log(startDay.substring(8, 10));
  const array = [];

  const days = Array.from(getDates(startDay, todayDate));
  for (let i = 0; i < days.length; i++) {
    if (days[i].substring(8, 10) === nthDay) {
      // Filter out months that are still in the future
      const toNumber = Number(days[i].toString().replaceAll('-', ''));
      const toNumberToday = Number(todayDate.replaceAll('-', ''));

      if (toNumber < toNumberToday) {
        array.push(days[i]);
      }
    }
  }

  return array;
}
