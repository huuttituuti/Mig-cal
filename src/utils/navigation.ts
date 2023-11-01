export function createNavigation(years: Array, months: Array) {
  const yearContainer = document.querySelector("[navigation='year-container']");
  const monthContainer = document.querySelector("[navigation='month-container']");

  for (let i = 0; i < years.length; i++) {
    const div = document.createElement('div');
    div.setAttribute('navigation', years[i]);
    div.classList.add('navigation_year');
    div.textContent = years[i].toString();
    yearContainer?.appendChild(div);
    div.addEventListener('click', function () {
      //console.log(div.textContent);
    });
  }

  for (let i = 0; i < months.length; i++) {
    const div = document.createElement('div');
    div.setAttribute('navigation', months[i]);
    div.classList.add('navigation_month');
    div.textContent = months[i].toString();
    monthContainer?.appendChild(div);
    div.addEventListener('click', function () {
      //console.log(div.textContent);
    });
  }
}
