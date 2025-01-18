const omit = <T extends object>(obj: T, keys: Array<keyof T>) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as keyof T)));

export { omit };
