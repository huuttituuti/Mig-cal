import { otherMentions } from 'src/other-mentions';

import { daysInMonth } from './days-in-month';
import { minTwoDigits } from './min-two-digits';

export function calendar(years: Array) {
  const root = document.getElementById('root');
  const yearsArray = years; /*[2023, 2022, 2021]*/
  const navYearContainer = document.querySelector("[navigation='year-container']");
  const navMonthContainer = document.querySelector("[navigation='month-container']");
  const navMonthWrp = document.querySelector("[navigation='month-wrp']");

  for (let i = 0; i < yearsArray.length; i++) {
    const yearString = String(yearsArray[i]);
    // create container for each year
    const container = document.createElement('div');
    container.classList.add('month_container');
    container.setAttribute('container', `${yearsArray[i]}`);
    root.appendChild(container);

    // create section 12 times (for 12 months) for each year
    const sectionModel = document.querySelector("[calendar='model']");
    let section;
    for (let i = 0; i < 12; i++) {
      section = sectionModel.cloneNode(true);
      container.appendChild(section);
    }

    const sections = container.querySelectorAll("[calendar='model']");
    // reverse sort months
    /*const sectionsArray = Array.from(sections);
    sectionsArray.reverse();
    sectionsArray.forEach(function (node) {
      container.appendChild(node);
    });*/
    for (let i = 0; i < sections.length; i++) {
      const index = minTwoDigits(Number([i]) + 1);
      // set right year and month as attribute
      sections[i].setAttribute('id', `${yearString}-${String(index)}`);
      // create right amount of divs for days
      const grid = sections[i].querySelector("[calendar='grid']");
      const daysTotal = daysInMonth(index, yearString);
      const divModel = document.querySelector("[calendar='day-wrp']");
      let dayWrp;
      for (let i = 0; i < daysTotal; i++) {
        dayWrp = divModel.cloneNode(true);
        // set date in right format as id
        dayWrp.id = `${yearString}-${index}-${minTwoDigits(i + 1)}`;
        // set text to represent right day
        dayWrp.querySelector("[calendar='day']").textContent = i + 1;
        grid.appendChild(dayWrp);
      }
      const days = sections[i].querySelectorAll("[calendar='day-wrp']");
      for (let i = 0; i < days.length; i++) {
        const day = days[i].querySelector("[calendar='day']").textContent;
      }

      // Fillers
      const fillerModel = document.querySelector("[calendar='filler']");
      // Matt Zeunert's answer in
      //"Get which day of week a month starts on from given input of month and year"
      let startDay = new Date(`${Number(yearString)}-${Number([i]) + 1}-01`).getDay();
      startDay = startDay === 0 ? 7 : startDay;
      for (let i = 0; i < startDay - 1; i++) {
        if (startDay === -1) {
          //console.log(startDay);
        } else if (startDay > 0) {
          const filler = fillerModel.cloneNode(true);
          const firstChild = grid.childNodes[7];
          grid.insertBefore(filler, firstChild);
        }
      }
      sections[i].removeAttribute('calendar');
    } // for sections
  }

  // NAVIGATION
  const navTabs = document.querySelector('.navigation_tabs');
  const navMonthWrpChildren = navTabs?.querySelectorAll('[navigation="month-box"]');

  // offset for date container
  const monthDateContainer_height = document.querySelector(
    "[calendar='date-container']"
  ).offsetHeight;
  // add anchor links to months
  for (let i = 0; i < navMonthWrpChildren.length; i++) {
    const attrYear = navMonthWrpChildren[i].firstChild?.firstChild.href.toString().slice(39, 43);
    //console.log(attrYear);
    const attrMonth = navMonthWrpChildren[i].firstChild?.firstChild.href.toString().slice(44, 46);
    // DOTS - On page load, add important dots next to navigation months
    const attr = `${attrYear}-${attrMonth}`;
    const importantMention = otherMentions.find(
      (i) => Object.keys(i).toString().slice(0, 7) === attr
    );
    if (importantMention !== undefined) {
      navMonthWrpChildren[i].firstChild.nextSibling.classList.remove('hide');
    }

    // On click
    navMonthWrpChildren[i].addEventListener('click', function () {
      const elem = document.querySelector(`[id="${attr}"]`);
      // scroll to correct section + add offset for the date container
      elem.style.scrollMarginTop = `${monthDateContainer_height}px`;
      elem.scrollIntoView({ block: 'start' /*, behavior: 'smooth'*/ });
    });
  }

  // On page load, always jump to current year and month
  const currentYear = navYearContainer?.firstChild;
  currentYear.click();
  const todayMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const currentMonth = navMonthWrp?.querySelector(
    `[href="#${currentYear?.textContent}-${todayMonth}"]`
  );
  currentMonth.classList.add('current');
  currentMonth.click();

  // NAVIGATION - changing the year, month and other mentions
  const changingYear = document.querySelector("[calendar='year']");
  const changingMonth = document.querySelector("[calendar='month']");
  const changingNotes = document.querySelector("[calendar='notes']");

  const monthSections = document.querySelectorAll('.month_section');
  const config = { rootMargin: '0% 0px 10% 0px', threshold: 0.6 };
  const observer = new IntersectionObserver(function (events, self) {
    events.forEach((event) => {
      const year = event.target.getAttribute('id')?.toString().slice(0, 4);
      const month = event.target.getAttribute('id')?.toString().slice(5, 7);
      const navCurrentYear = navYearContainer?.querySelector(`[data-w-tab='${year}']`);
      const navCurrentMonth = document?.querySelector(`[href='#${year}-${month}']`);
      if (event.isIntersecting) {
        if (year !== null) {
          // change the text in sticky nav to current year
          changingYear.textContent = year;

          // set current class to current month
          navCurrentMonth.classList.add('current');
          const navMonths = document?.querySelectorAll('[navigation="month-box"]');
          for (let i = 0; i < navMonths.length; i++) {
            const a = navMonths[i].firstChild?.firstChild;
            const aString = `#${a.href.toString().slice(39, 46)}`;
            // Add current class
            if (a.classList.contains('current')) {
              if (aString !== navCurrentMonth?.getAttribute('href')) {
                a.classList.remove('current');
              }
            }
          } // for navMonths

          // if year changes, click the correct year tab open
          const y = document.querySelector(`[data-w-tab="${year}"]`);
          if (!y?.classList.contains('w--current')) {
            y.click();
          }

          // get other mentions
          const item = otherMentions.find(
            (i) => Object.keys(i).toString().slice(0, 7) === `${year}-${month}`
          );
          if (item !== undefined) {
            changingNotes.textContent = Object.values(item).toString();
          } else {
            changingNotes.textContent = '-';
          }

          // set current month name
          switch (month) {
            case '01':
              changingMonth.textContent = 'Tammikuu';
              break;
            case '02':
              changingMonth.textContent = 'Helmikuu';
              break;
            case '03':
              changingMonth.textContent = 'Maaliskuu';
              break;
            case '04':
              changingMonth.textContent = 'Huhtikuu';
              break;
            case '05':
              changingMonth.textContent = 'Toukokuu';
              break;
            case '06':
              changingMonth.textContent = 'Kesäkuu';
              break;
            case '07':
              changingMonth.textContent = 'Heinäkuu';
              break;
            case '08':
              changingMonth.textContent = 'Elokuu';
              break;
            case '09':
              changingMonth.textContent = 'Syyskuu';
              break;
            case '10':
              changingMonth.textContent = 'Lokakuu';
              break;
            case '11':
              changingMonth.textContent = 'Marraskuu';
              break;
            case '12':
              changingMonth.textContent = 'Joulukuu';
              break;
          } // switch
        } // if (year !== null)
      } // if (event.isIntersecting)
    }); // events.forEach
  }, config); // observer

  monthSections.forEach((monthSection) => {
    observer.observe(monthSection);
  });
}
