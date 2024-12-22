import { getSpacing } from './getSpacing';

const THEME: any = {
  spacing: {
    macro: 0.5,
    unit: 'rem',
  },
};

test('get spacing with "rem" suffix when not specifying the suffix flag', () => {
  const result = getSpacing(0.5)({ theme: THEME });
  expect(result).toBe('0.25rem');
});
