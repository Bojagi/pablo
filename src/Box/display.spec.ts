import { renderCssResult } from '../../testUtils/renderCssResult';
import { displayInterpolateFn } from './display';

test('pass no display in the props', () => {
  const result: any = displayInterpolateFn({});
  expect(result).toBeUndefined();
});

test.each([['block'], ['inline'], ['flex'], ['inline-flex'], ['table']])(
  'pass display "%s" props and render correctly',
  (value: any) => {
    const result: any = displayInterpolateFn({ display: value });
    const renderedResult = renderCssResult(result, {});
    expect(renderedResult).toEqual(`display:${value};`);
  }
);
