export function sorter(a, b) {
  return a.dataset.categoryGroup.localeCompare(b.dataset.categoryGroup); // sorts based on alphabetical order
}
