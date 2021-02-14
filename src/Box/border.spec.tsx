import { renderStyledComponent } from '../../testUtils/renderStyledComponent';
import { borderInterpolateFn } from './border';

const theme: any = {
  colors: {
    borders: {
      main: 'mainBorders',
      light: 'lightBorders',
    },
  },
};

test('pass no borders in the props', () => {
  const result = borderInterpolateFn({ theme });
  expect(result).toEqual([]);
});

const allProps = ['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'];

describe.each([
  ['border', 'border'],
  ['borderTop', 'border-top'],
  ['borderRight', 'border-right'],
  ['borderBottom', 'border-bottom'],
  ['borderLeft', 'border-left'],
])('"%s" prop', (prop, cssPropName) => {
  test('pass default borders in the props when value is "true"', () => {
    const props = { theme, [prop]: true };
    const elem = renderStyledComponent(props, borderInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '1px solid mainBorders');
    testOthersNegative(prop, elem);
  });

  test('pass main color borders in the props when value is "main"', () => {
    const props = { theme, [prop]: 'main' };
    const elem = renderStyledComponent(props, borderInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '1px solid mainBorders');
    testOthersNegative(prop, elem);
  });

  test('pass main color borders in the props when value is "light"', () => {
    const props = { theme, [prop]: 'light' };
    const elem = renderStyledComponent(props, borderInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '1px solid lightBorders');
    testOthersNegative(prop, elem);
  });

  test('pass custom borders in the props when value is a css border definition', () => {
    const props = { theme, [prop]: '2px dotted red' };
    const elem = renderStyledComponent(props, borderInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, '2px dotted red');
    testOthersNegative(prop, elem);
  });
});

function testOthersNegative(propName: string, elem) {
  return allProps
    .filter((item) => item !== propName)
    .forEach((item) => expect(elem).toHaveStyleRule(item, undefined));
}
