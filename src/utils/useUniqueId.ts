import { useId } from 'react';

export function createUniqueId(prefix) {
  return `pbl-${prefix}-${Math.random().toString(16).slice(2)}`;
}

export function useUniqueId() {
  return useId();
}
