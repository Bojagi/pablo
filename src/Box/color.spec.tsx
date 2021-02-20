import { renderStyledComponent } from '../../testUtils/renderStyledComponent';
import { colorInterpolateFn } from './color';

const theme: any = {
  colors: {
    brand: {
      main: 'mainBrand',
      lightest: 'lightestBrand',
    },
    neutral: {
      main: 'mainNeutral',
      lightest: 'lightestNeutral',
    },
  },
};

test('pass no colors in the props', () => {
  const elem = renderStyledComponent({ theme }, colorInterpolateFn);
  expect(elem).not.toHaveStyleRule('background-color');
  expect(elem).not.toHaveStyleRule('color');
});

const allProps = ['color', 'bgColor'];

describe.each([
  ['color', 'color'],
  ['bgColor', 'background-color'],
])('"%s" prop', (prop, cssPropName) => {
  test('pass "brand.main', () => {
    const props = { theme, [prop]: 'brand.main' };
    const elem = renderStyledComponent(props, colorInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, 'mainBrand');
    testOthersNegative(prop, elem);
  });
  test('pass "brand.lightest', () => {
    const props = { theme, [prop]: 'brand.lightest' };
    const elem = renderStyledComponent(props, colorInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, 'lightestBrand');
    testOthersNegative(prop, elem);
  });
  test('pass "neutral.main', () => {
    const props = { theme, [prop]: 'neutral.main' };
    const elem = renderStyledComponent(props, colorInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, 'mainNeutral');
    testOthersNegative(prop, elem);
  });
  test('pass "neutral.lightest', () => {
    const props = { theme, [prop]: 'neutral.lightest' };
    const elem = renderStyledComponent(props, colorInterpolateFn);
    expect(elem).toHaveStyleRule(cssPropName, 'lightestNeutral');
    testOthersNegative(prop, elem);
  });
});

function testOthersNegative(propName: string, elem) {
  return allProps
    .filter((item) => item !== propName)
    .forEach((item) => expect(elem).toHaveStyleRule(item, undefined));
}
