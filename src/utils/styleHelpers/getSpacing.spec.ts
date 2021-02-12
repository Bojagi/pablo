import { getSpacing } from './getSpacing';

const THEME: any = {
  spacing: {
    unit: 10,
  },
};

test('get spacing with "px" suffix when not specifying a suffix', () => {
  const result = getSpacing(1)({ theme: THEME });
  expect(result).toBe('10px');
});

test('get spacing with custom suffix when not specifying a string suffix', () => {
  const result = getSpacing(2, 'rem')({ theme: THEME });
  expect(result).toBe('20rem');
});

test('get raw number spacing when  specifying suffix "false"', () => {
  const result = getSpacing(3, false)({ theme: THEME });
  expect(result).toBe(30);
});
