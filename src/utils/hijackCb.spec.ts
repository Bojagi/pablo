import { hijackCbAfter, hijackCbBefore } from './hijackCb';

test('hijackBefore with undefined callback and call hijackFn and no callback', () => {
  const hijackFn = jest.fn();
  expect(hijackFn).toHaveBeenCalledTimes(0);
  const result = hijackCbBefore(undefined, hijackFn)('a', 'b', 'c');
  expect(result).toBeUndefined();
  expect(hijackFn).toHaveBeenCalledTimes(1);
});

test('hijackBefore with callback and call hijackFn before callback', () => {
  const hijackFn = jest.fn();
  const cbFn = jest.fn(() => 'my-result');
  expect(hijackFn).toHaveBeenCalledTimes(0);
  const result = hijackCbBefore(cbFn, hijackFn)('a', 'b', 'c');
  expect(result).toBe('my-result');
  expect(cbFn).toHaveBeenCalledTimes(1);
  expect(cbFn).toHaveBeenCalledWith('a', 'b', 'c');
  expect(hijackFn).toHaveBeenCalledBefore(cbFn);
  expect(hijackFn).toHaveBeenCalledTimes(1);
});

test('hijackAfter with undefined callback and call hijackFn and no callback', () => {
  const hijackFn = jest.fn();
  expect(hijackFn).toHaveBeenCalledTimes(0);
  const result = hijackCbAfter(undefined, hijackFn)('a', 'b', 'c');
  expect(result).toBeUndefined();
  expect(hijackFn).toHaveBeenCalledTimes(1);
});

test('hijackAfter with callback and call hijackFn after callback', () => {
  const hijackFn = jest.fn();
  const cbFn = jest.fn(() => 'my-result');
  expect(hijackFn).toHaveBeenCalledTimes(0);
  const result = hijackCbAfter(cbFn, hijackFn)('a', 'b', 'c');
  expect(result).toBe('my-result');
  expect(cbFn).toHaveBeenCalledTimes(1);
  expect(cbFn).toHaveBeenCalledWith('a', 'b', 'c');
  expect(hijackFn).toHaveBeenCalledAfter(cbFn);
  expect(hijackFn).toHaveBeenCalledTimes(1);
});
