import { renderCssResult } from '../../testUtils/renderCssResult';
import { borderInterpolateFn } from "./border"

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
  expect(result).toEqual(['\n  ',  '\n  ', '\n  ', '\n  ', '\n  ', '\n'])
});

describe.each([
  ['border', 'border'],
  ['borderTop', 'border-top'],
  ['borderRight', 'border-right'],
  ['borderBottom', 'border-bottom'],
  ['borderLeft', 'border-left'],
])('"%s" prop', (prop, cssPropName) => {
  test('pass default borders in the props when value is "true"', () => {
    const props = { theme, [prop]: true };
    const result: any = borderInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);
    expect(renderedResult).toEqual(`${cssPropName}: 1px solid mainBorders;`)
  });
  
  test('pass main color borders in the props when value is "main"', () => {
    const props = { theme, [prop]: 'main' };
    const result: any = borderInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);  
    expect(renderedResult).toEqual(`${cssPropName}: 1px solid mainBorders;`)
  });
  
  test('pass main color borders in the props when value is "light"', () => {
    const props = { theme, [prop]: 'light' };
    const result: any = borderInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);  
    expect(renderedResult).toEqual(`${cssPropName}: 1px solid lightBorders;`)
  });
  
  test('pass custom borders in the props when value is a css border definition', () => {
    const props = { theme, [prop]: '2px dotted red' };
    const result: any = borderInterpolateFn(props);
    const renderedResult = renderCssResult(result, props);  
    expect(renderedResult).toEqual(`${cssPropName}: 2px dotted red`)
  });  
});

