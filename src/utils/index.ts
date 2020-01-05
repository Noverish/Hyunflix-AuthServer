export function dateToString(date: Date) {
  const year   = date.getFullYear().toString().padStart(4, '0');
  const month  = (date.getMonth() + 1).toString().padStart(2, '0');
  const day    = date.getDate().toString().padStart(2, '0');
  const hour   = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getEnabledIndexOfBinary(num: number): number[] {
  return num.toString(2)
    .split('')
    .reverse()
    .map((v, i) => v === '1' ? i : null)
    .filter(v => v !== null);
}
