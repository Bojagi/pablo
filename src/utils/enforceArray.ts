const enforceArray = <T>(value: T | T[] | readonly T[]): T[] => {
  return Array.isArray(value) ? (value as unknown as T[]) : [value as T];
};

export { enforceArray };
