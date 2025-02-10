// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from '@testing-library/react';

export function waitOneTick(ms: number = 0, timeMocked: boolean = false) {
  if (timeMocked) {
    vi.useRealTimers();
  }
  const promise = act(() => new Promise((resolve) => setTimeout(resolve, ms)));
  if (timeMocked) {
    vi.useFakeTimers();
  }
  return promise;
}
