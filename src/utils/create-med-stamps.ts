// doesn't work
export function createMedStamps(name, obj, icon, div) {
  const { stamp } = obj;

  if (stamp === true) {
    const stampText = document.createElement('div');
    stampText.classList.add('marks_others', name);
    stampText.setAttribute('calendar', name);
    stampText.textContent = obj.amount_mg + icon;
    div.appendChild(stampText);
  }
}
