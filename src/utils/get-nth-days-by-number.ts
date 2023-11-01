import { getDates } from './get-dates';

export function getNthDaysByNumber(startDay: string, nthDay: string) {
  const dateYear = new Intl.DateTimeFormat('fi', { year: 'numeric' }).format(new Date());
  const dateMonth = new Intl.DateTimeFormat('fi', { month: 'numeric' }).format(new Date());
  const dateDay = new Intl.DateTimeFormat('fi', { day: '2-digit' }).format(new Date());
  const todayDate = `${dateYear}-${dateMonth}-${dateDay}`;

  //console.log(startDay.substring(8, 10));
  const array = [];

  const days = Array.from(getDates(startDay, todayDate));
  //console.log(days);
  for (let i = 0; i < days.length; i++) {
    if (days[i].substring(8, 10) === nthDay) {
      array.push(days[i]);
    }
  }

  return array;
}
