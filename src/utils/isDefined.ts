export function isDefined(value: any): value is true {
  return value || value === 0;
}
