import { getComponentStyle, shadowTransformer, transitionTransformer } from './getComponentStyle';

let theme;

beforeEach(() => {
  theme = {
    some: 'someInterpolatedValue',
    componentStyles: {
      button: {
        transition: [
          ['background-color', '0.2s', 'ease-in'],
          ['transform', '0.3s'],
        ],
        shadow: [['0 0 2px rgba(0,0,0,0.2)', '0 3px 5px rgba(0,0,0,0.1)']],
        unknownState: 'yellow',
        hover: {
          color: 'black',
          interpolatedColor: (props) => props.theme.some,
        },
        focus: {
          color: 'green',
        },
      },
    },
  };
});

test('Get component style by simple path', () => {
  const result = getComponentStyle('button.hover.color')({ theme });
  expect(result).toBe('black');
});

test('Get component style by interpolated path with props put into the path', () => {
  const result = getComponentStyle('button.{state}.color')({ theme, state: 'focus' });
  expect(result).toBe('green');
});

test('Get component style by interpolated path with unknown props and put prop name into path', () => {
  const result = getComponentStyle('button.{unknownState}')({ theme, state: 'focus' });
  expect(result).toBe('yellow');
});

test('Get component style with content being a interpolation function', () => {
  const result = getComponentStyle('button.hover.interpolatedColor')({ theme });
  expect(result).toBe('someInterpolatedValue');
});

test('Get empty object component style with unknown path', () => {
  const result = getComponentStyle('button.unknown.color')({ theme });
  expect(result).toEqual({});
});

test('Get empty object component style with componentStyles being undefined', () => {
  const result = getComponentStyle('button.hover.color')({ theme: {} });
  expect(result).toEqual({});
});

test('Get component style with transition transform function', () => {
  const result = getComponentStyle('button.transition', transitionTransformer)({ theme });
  expect(result).toBe('background-color 0.2s ease-in, transform 0.3s');
});

test('Get component style with shadow transform function', () => {
  const result = getComponentStyle('button.shadow', shadowTransformer)({ theme });
  expect(result).toBe('0 0 2px rgba(0,0,0,0.2),0 3px 5px rgba(0,0,0,0.1)');
});
