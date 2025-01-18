const pick = <T extends object>(obj: T, keys: Array<keyof T>) =>
  Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]]));
export { pick };
