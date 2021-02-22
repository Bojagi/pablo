import React from 'react';

export function createUniqueId(prefix) {
  return `pbl-${prefix}-${Math.random().toString(16).slice(2)}`;
}

export function useUniqueId(prefix: string) {
  return React.useMemo(() => createUniqueId(prefix), [prefix]);
}
