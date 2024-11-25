type PropEqualPredicate<P extends Record<string, any>> = (prevProps?: P, nextProps?: P) => boolean;

// Type that only filters object props from P and maps them to a predicate
type SpecialChecksMap<P> = {
  [K in keyof P]: P[K] extends Record<string, any> ? PropEqualPredicate<P[K]> : never;
};

function getObjectEntries<T extends Record<any, any>, K extends keyof T = keyof T>(
  obj: T
): Array<[K, T[K]]> {
  return Object.entries(obj) as Array<[K, T[K]]>;
}

function arePropsEqual<P extends object>(
  specialChecks: Partial<SpecialChecksMap<Required<P>>> = {}
): PropEqualPredicate<P> {
  return (prevProps: P, nextProps: P) => {
    const entries = getObjectEntries(prevProps);
    return !entries.some(([key, value]) => {
      const check = specialChecks[key];
      if (check) {
        return check(prevProps[key] as any, nextProps[key] as any);
      }

      return value !== nextProps[key];
    });
  };
}

export { arePropsEqual };
