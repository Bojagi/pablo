import { getColor } from './getColor';

const THEME: any = {
  colors: {
    brand: {
      main: '#666666',
      light: '#999999',
    },
  },
};

test('get color from theme with no variant argument and get main color', () => {
  const result = getColor('brand')({ theme: THEME });
  expect(result).toBe('#666666');
});

test('get color from theme with no variant argument and get main color', () => {
  const result = getColor('brand', 'light')({ theme: THEME });
  expect(result).toBe('#999999');
});
