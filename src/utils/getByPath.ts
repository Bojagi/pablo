import { Path } from 'ts-toolbelt/out/Object/Path';
import { Split } from 'ts-toolbelt/out/String/Split';
import { KeyMap } from '../types';

export function getByPath<O extends object, P extends KeyMap<O>>(
  obj: O,
  path: P
): Path<O, Split<P, '.'>> {
  if (!path) {
    return undefined as any;
  }

  return internalGetByPath(obj, (path as string).split('.'));
}

function internalGetByPath(obj: Record<string, any>, path: string[]) {
  const value = obj[path[0]];
  if (path.length === 1) {
    return value;
  }
  return internalGetByPath(value, path.slice(1));
}
