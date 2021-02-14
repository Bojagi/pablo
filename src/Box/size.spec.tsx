import { renderStyledComponent } from '../../testUtils/renderStyledComponent';
import { sizeInterpolateFn } from './size';

const theme: any = {
  colors: {
    borders: {
      main: 'mainBorders',
      light: 'lightBorders',
    },
  },
};

test('pass no size in the props', () => {
  const result = sizeInterpolateFn({ theme });
  expect(result).toEqual([]);
});

const allProps = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'];

describe.each([
  ['width', 'width'],
  ['height', 'height'],
  ['minWidth', 'min-width'],
  ['minHeight', 'min-height'],
  ['maxWidth', 'max-width'],
  ['maxHeight', 'max-height'],
])('"%s" prop', (prop, cssPropName) => {
  test('pass string value and directly use it', () => {
    const props = { theme, [prop]: '100vh' };
    const elem = renderStyledComponent(props, sizeInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '100vh');
    testOthersNegative(prop, elem);
  });

  test('pass number value and use "px" unit', () => {
    const props = { theme, [prop]: 200 };
    const elem = renderStyledComponent(props, sizeInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '200px');
    testOthersNegative(prop, elem);
  });
});

function testOthersNegative(propName: string, elem) {
  return allProps
    .filter((item) => item !== propName)
    .forEach((item) => expect(elem).toHaveStyleRule(item, undefined));
}
