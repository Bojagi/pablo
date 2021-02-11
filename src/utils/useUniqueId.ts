import React from 'react';

export function useUniqueId(prefix: string) {
  return React.useMemo(() => `pbl-${prefix}-${Math.random().toString(16).slice(2)}`, [prefix]);
}
