import { getSpacing } from './getSpacing';

const THEME: any = {
  space: [0, 4, 8, 16],
};

test('get spacing with "px" suffix when not specifying the suffix flag', () => {
  const result = getSpacing(1)({ theme: THEME });
  expect(result).toBe('4px');
});

test('get raw number spacing when  specifying suffix "false"', () => {
  const result = getSpacing(3, false)({ theme: THEME });
  expect(result).toBe(16);
});
