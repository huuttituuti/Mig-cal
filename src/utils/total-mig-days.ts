export function totalMigDays() {
  const display = document.querySelector("[calendar='month-total']");
  const monthSections = document.querySelectorAll('.month_section');

  const config = { rootMargin: '0% 0px 10% 0px', threshold: 0.6 };
  const observer = new IntersectionObserver(function (events, self) {
    events.forEach((event) => {
      if (event.isIntersecting) {
        display.textContent = event.target.querySelectorAll("[mig='true']").length.toString();
      } // if (event.isIntersecting)
    }); // events.forEach
  }, config); // observer

  monthSections.forEach((monthSection) => {
    observer.observe(monthSection);
  });
}
