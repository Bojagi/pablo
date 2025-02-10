import { act, renderHook } from '@testing-library/react';
import { useDelayedBooleanState } from './useDelayBooleanState';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(global, 'setTimeout');
  vi.spyOn(global, 'clearTimeout');
});

afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});

test('should set delayed state with initial value being false', () => {
  const { result } = renderHook(() => useDelayedBooleanState(false, 100));
  expect(result.current).toBeArrayOfSize(2);
  expect(result.current[0]).toBeFalse();
  expect(result.current[1]).toBeFunction();
});

test('should set delayed state with initial value being true', () => {
  const { result } = renderHook(() => useDelayedBooleanState(true, 100));
  expect(result.current[0]).toBeTrue();
  expect(setTimeout).not.toHaveBeenCalled();
});

test('Update state from false to true and only set true after delay time', () => {
  const { result } = renderHook(() => useDelayedBooleanState(false, 100));
  act(() => {
    result.current[1](true);
  });
  expect(result.current[0]).toBeFalse();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

  act(() => {
    vi.runAllTimers();
  });
  expect(result.current[0]).toBeTrue();
});

test('Update state from true to false and set it directly (no delay)', () => {
  const { result } = renderHook(() => useDelayedBooleanState(true, 100));
  act(() => {
    result.current[1](false);
  });

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

  act(() => {
    vi.advanceTimersByTime(0);
  });
  expect(result.current[0]).toBeFalse();
});

test('Update state from true to false and set it with delay when set', () => {
  const { result } = renderHook(() => useDelayedBooleanState(true, 100, 200));
  act(() => {
    result.current[1](false);
  });
  expect(result.current[0]).toBeTrue();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
  act(() => {
    vi.advanceTimersByTime(200);
  });
  expect(result.current[0]).toBeFalse();
});

test('Update state from false to true and within delay time back to false ... and cancel timer', () => {
  const { result } = renderHook(() => useDelayedBooleanState(false, 100));
  act(() => {
    result.current[1](true);
  });
  expect(result.current[0]).toBeFalse();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  expect(clearTimeout).toHaveBeenCalledTimes(0);

  act(() => {
    vi.advanceTimersByTime(50);
    result.current[1](false);
  });

  // Result is still false, timer has been cancelled
  expect(result.current[0]).toBeFalse();
  expect(clearTimeout).toHaveBeenCalledTimes(1);

  // Run an additional 100ms (just to be sure)
  act(() => {
    vi.advanceTimersByTime(100);
  });

  // Needs to be false still (timeout callback was not called)
  expect(result.current[0]).toBeFalse();
});
