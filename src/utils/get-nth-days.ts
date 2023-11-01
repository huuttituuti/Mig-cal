export function getNthDays(startDay: string, number: number) {
  const start = Date.parse(startDay);
  const calculation = number * 24 * 60 * 60 * 1000;
  const end = Date.now();

  const arr = [];
  arr.push(start);

  while (true) {
    const recent = arr[arr.length - 1];
    if (recent > end) {
      break;
    }
    arr.push(recent + calculation);
  }
  // Remove last item
  const removed = arr.slice(0, -1);
  // Format to this '2022-05-01'
  const formatted = removed.map(
    (i) =>
      `${new Date(i).getFullYear()}-${(new Date(i).getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date(i).getDate().toString().padStart(2, '0')}`
  );

  return formatted;
}
