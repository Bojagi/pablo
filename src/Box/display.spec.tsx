import { displayInterpolateFn } from './display';
import { renderStyledComponent } from '../../testUtils/renderStyledComponent';

test('pass no display in the props', () => {
  const result: any = displayInterpolateFn({} as any);
  expect(result).toBeArrayOfSize(0);
});

test.each([['block'], ['inline'], ['flex'], ['inline-flex'], ['table']])(
  'pass display "%s" props and render correctly',
  (value: any) => {
    const props = { display: value };
    const elem = renderStyledComponent(props, displayInterpolateFn);
    expect(elem).toHaveStyleRule('display', value);
  }
);
