import { renderCssResult } from '../../testUtils/renderCssResult';
import { colorInterpolateFn } from './color';

const theme: any = {
  colors: {
    brand: {
      main: 'mainBrand',
      light: 'lightBrand',
    },
    neutral: {
      main: 'mainNeutral',
      light: 'lightNeutral',
    },
  },
};

test('pass no colors in the props', () => {
  const result: any = colorInterpolateFn({ theme });
  const renderedResult = renderCssResult(result, { theme });
  expect(renderedResult).toEqual('');
});

describe.each([
  ['color', 'color'],
  ['bgColor', 'background-color'],
])('"%s" prop', (prop, cssPropName) => {
  test('pass "brand.main', () => {
    const props = { theme, [prop]: 'brand.main' };
    const result: any = colorInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);
    expect(renderedResult).toEqual(`${cssPropName}:mainBrand;`);
  });
  test('pass "brand.light', () => {
    const props = { theme, [prop]: 'brand.light' };
    const result: any = colorInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);
    expect(renderedResult).toEqual(`${cssPropName}:lightBrand;`);
  });
  test('pass "neutral.main', () => {
    const props = { theme, [prop]: 'neutral.main' };
    const result: any = colorInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);
    expect(renderedResult).toEqual(`${cssPropName}:mainNeutral;`);
  });
  test('pass "neutral.light', () => {
    const props = { theme, [prop]: 'neutral.light' };
    const result: any = colorInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);
    expect(renderedResult).toEqual(`${cssPropName}:lightNeutral;`);
  });
});
