// lib/utils.ts

export function addCommas(x: any) {
  if (x === undefined || x === null) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
