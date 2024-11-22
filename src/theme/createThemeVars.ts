import isObject from 'isobject';

type DeepStringReplace<T, M extends [any, any]> = {
  [P in keyof T]: T[P] extends object ? DeepStringReplace<T[P], M> : string;
};

export function createThemeVars<T extends Record<string, any>>(base: string, themeObject: T) {
  return internalThemeVars(`pbl-theme-${base}`, themeObject);
}

function internalThemeVars<T extends Record<string, any>>(
  base: string,
  themeObject: T
): DeepStringReplace<T, [number, string]> {
  return Object.entries(themeObject).reduce((acc, [key, value]) => {
    const keyVar = `${base}-${key}`;
    return { ...acc, [key]: isObject(value) ? internalThemeVars(keyVar, value) : `${keyVar}` };
  }, {} as any);
}

export function createThemeVarArray<T extends readonly string[]>(
  base: string,
  values: T
): Record<T[number], string> {
  return values.reduce(
    (acc, value) => ({ ...acc, [value]: `pbl-theme-${base}-${value}` }),
    {} as any
  );
}
