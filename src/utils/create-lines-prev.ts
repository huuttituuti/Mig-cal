import { getDates } from '$utils/get-dates';

export function createLinesPrev(name: string, icon: string) {
  const meds = document.querySelectorAll(`[calendar='${name}']`);
  const medicationValues = [];

  // Make into groups and create lines between gourps first and last id
  for (let i = 0; i < meds.length; i++) {
    const grandparent = meds[i].parentElement?.parentElement;
    const amount = Number(meds[i].textContent?.charAt(0));

    const obj = {
      id: grandparent?.id,
      amount: amount,
      icon: meds[i].textContent?.charAt(1),
    };
    medicationValues.push(obj);
  } // for

  const groups = [];

  for (let i = 0; i < medicationValues.length; i++) {
    // Get next date
    const nextDate = medicationValues.includes(medicationValues[i])
      ? medicationValues[
          (medicationValues.indexOf(medicationValues[i]) + 1) % medicationValues.length
        ]
      : null;

    // Get next dates in which the amount is 0
    if (nextDate?.amount === 0) {
      const allPrevDates = medicationValues.slice(0, medicationValues.indexOf(nextDate));

      // If there's no 0 in the previous array items, find dates between beginning and current
      if (allPrevDates.find((el) => el.amount === 0) === undefined) {
        groups.push(getDates(medicationValues[0].id, nextDate.id));
      } /*If there is 0, get dates one after the 0 and current*/ else {
        const nextZero = allPrevDates.find((el) => el.amount === 0);
        const nextStartIndex = medicationValues.indexOf(nextZero) + 1;
        groups.push(getDates(medicationValues[nextStartIndex].id, nextDate.id));

        // If the last medicationValues array item's amount isn't 0, continue line till todays date
        if (medicationValues[medicationValues.length - 1].amount !== 0) {
          const continuationIndex = medicationValues.indexOf(nextDate) + 1;

          const todayYear = new Date().getFullYear();
          const todayMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
          const todayDay = new Date().getDate().toString().padStart(2, '0');
          const todayDate = todayYear + '-' + todayMonth + '-' + todayDay;

          groups.push(getDates(medicationValues[continuationIndex].id, todayDate));
        }
      }
    }
  } // for medicationvalues

  // If the last medicationValues array item's amount isn't 0, continue //forever// till todays date
  /*if (medicationValues[medicationValues.length - 1].amount !== 0) {
    const lastItem = medicationValues[medicationValues.length - 1].id;
    //const days = document.querySelectorAll("[calendar='day-wrp']");
    //const lastDate = days[days.length - 1].id;

    const todayYear = new Date().getFullYear();
    const todayMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const todayDay = new Date().getDate().toString().padStart(2, '0');
    const todayDate = todayYear + '-' + todayMonth + '-' + todayDay;

    groups.push(getDates(lastItem, todayDate));
  }*/

  // ADD LINES
  for (let i = 0; i < groups.length; i++) {
    const dates = groups[i];
    // remove duplicates
    const filteredDates = [...new Set(dates)];

    for (let i = 0; i < filteredDates.length; i++) {
      //console.log(dates[i]);
      const target = document.getElementById(filteredDates[i]);
      const line = document.createElement('div');
      line.classList.add('marks_others-line');
      line.classList.add(name.toString());
      // If div already has a wrp div for lines
      if (target?.querySelector('.marks_preventive-line-wrp')) {
        target?.querySelector('.marks_preventive-line-wrp')?.appendChild(line);
      } /*If div doesn't have a wrp div for lines, create it*/ else {
        const container = document.createElement('div');
        container.classList.add('marks_preventive-line-wrp');
        target?.appendChild(container);
        container?.appendChild(line);
      }
    } // for dates
  } // for groups
  //console.log(groups);
}
