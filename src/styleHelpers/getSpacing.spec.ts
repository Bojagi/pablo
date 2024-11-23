import { getSpacing } from './getSpacing';

const THEME: any = {
  spacing: 8,
};

test('get spacing with "px" suffix when not specifying the suffix flag', () => {
  const result = getSpacing(0.5)({ theme: THEME });
  expect(result).toBe('4px');
});

test('get raw number spacing when  specifying suffix "false"', () => {
  const result = getSpacing(2, false)({ theme: THEME });
  expect(result).toBe(16);
});
