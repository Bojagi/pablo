import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { margin, padding } from './spacing';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

test('Margin system', () => {
  expect(margin({ m: 10, ...props })).toEqual({
    margin: '80px',
  });
});

test('Margin system single props', () => {
  expect(margin({ mt: 1, mr: 2, mb: 3, ml: 4, ...props })).toEqual({
    marginTop: '8px',
    marginRight: '16px',
    marginBottom: '24px',
    marginLeft: '32px',
  });
});

test('Margin system with x and y props', () => {
  expect(margin({ mx: 10, my: 20, ...props })).toEqual({
    marginLeft: '80px',
    marginRight: '80px',
    marginTop: '160px',
    marginBottom: '160px',
  });
});

test('Padding system', () => {
  expect(padding({ p: 10, ...props })).toEqual({
    padding: '80px',
  });
});

test('Padding system single props', () => {
  expect(padding({ pt: 1, pr: 2, pb: 3, pl: 4, ...props })).toEqual({
    paddingTop: '8px',
    paddingRight: '16px',
    paddingBottom: '24px',
    paddingLeft: '32px',
  });
});

test('Padding system with x and y props', () => {
  expect(padding({ px: 10, py: 20, ...props })).toEqual({
    paddingLeft: '80px',
    paddingRight: '80px',
    paddingTop: '160px',
    paddingBottom: '160px',
  });
});

test('Padding system with gap', () => {
  expect(padding({ gap: 10, ...props })).toEqual({
    gap: '80px 80px',
  });
  expect(padding({ gap: [[10, 1]], ...props })).toEqual({
    gap: '80px 8px',
  });
});

test('styled interpolation functions', () => {
  expect(margin.all(10)(props)).toEqual({
    margin: '80px',
  });
  expect(margin.top(1)(props)).toEqual({
    marginTop: '8px',
  });
  expect(margin.x(10)(props)).toEqual({
    marginLeft: '80px',
    marginRight: '80px',
  });
  expect(margin.y(10)(props)).toEqual({
    marginTop: '80px',
    marginBottom: '80px',
  });
  expect(padding.all(10)(props)).toEqual({
    padding: '80px',
  });
  expect(padding.top(1)(props)).toEqual({
    paddingTop: '8px',
  });
  expect(padding.x(10)(props)).toEqual({
    paddingLeft: '80px',
    paddingRight: '80px',
  });
  expect(padding.y(10)(props)).toEqual({
    paddingTop: '80px',
    paddingBottom: '80px',
  });
  expect(padding.gap(10)(props)).toEqual({
    gap: '80px 80px',
  });
});
