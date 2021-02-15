export function isDefined(value: any): value is true {
  return value !== null && value !== undefined;
}
