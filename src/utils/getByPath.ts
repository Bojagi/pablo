export function getByPath(obj: Record<string, any>, path: string) {
  if (!path) {
    return undefined;
  }

  return internalGetByPath(obj, path.split('.'));
}

function internalGetByPath(obj: Record<string, any>, path: string[]) {
  const value = obj[path[0]];
  if (path.length === 1) {
    return value;
  }
  return internalGetByPath(value, path.slice(1));
}
