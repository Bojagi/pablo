import { defaultTheme } from '../theme';
import { pixelTransform, system, systemInterpolation } from './system';

const callInterpolation = (interpolation: (props: object) => object, props?: object) =>
  interpolation({
    ...props,
    theme: defaultTheme as any,
  });

test('Create a system interpolation function', () => {
  const interpolationFn = systemInterpolation({
    properties: ['margin'],
    transform: pixelTransform,
  });
  const interpolation = interpolationFn(10);
  expect(callInterpolation(interpolation)).toEqual({ margin: '10px' });
});

test('Create a system interpolation function with multiple properties', () => {
  const interpolationFn = systemInterpolation({
    properties: ['margin-left', 'margin-right'],
    transform: pixelTransform,
  });
  const interpolation = interpolationFn(10);
  expect(callInterpolation(interpolation)).toEqual({
    'margin-left': '10px',
    'margin-right': '10px',
  });
});

test('Create a system interpolation from props', () => {
  const interpolation = system({
    properties: ['margin'],
    fromProps: ['m'],
    transform: pixelTransform,
  });
  expect(
    callInterpolation(interpolation, {
      m: 12,
    })
  ).toEqual({ margin: '12px' });
});

test('Create a system interpolation from props with multiple configs', () => {
  const interpolation = system([
    {
      properties: ['margin'],
      fromProps: ['m'],
      transform: pixelTransform,
    },
    {
      properties: ['padding'],
      fromProps: ['p'],
      transform: pixelTransform,
    },
  ]);
  expect(
    callInterpolation(interpolation, {
      m: 12,
      p: 13,
    })
  ).toEqual({ margin: '12px', padding: '13px' });
});

test('Create a system interpolation from props with responsive values as array', () => {
  const interpolation = system({
    properties: ['margin'],
    fromProps: ['m'],
    transform: pixelTransform,
  });
  expect(
    callInterpolation(interpolation, {
      m: [12, 15, 18],
    })
  ).toEqual({
    margin: '12px',
    '@media min-width: only screen and (min-width: var(--pbl-theme-breakpoints-sm))': {
      margin: '15px',
    },
    '@media min-width: only screen and (min-width: var(--pbl-theme-breakpoints-md))': {
      margin: '18px',
    },
  });
});

test('Create a system interpolation from props with responsive values as object', () => {
  const interpolation = system([
    {
      properties: ['margin'],
      fromProps: ['m'],
      transform: pixelTransform,
    },
  ]);
  expect(
    callInterpolation(interpolation, {
      m: { base: 12, sm: 15, lg: 18 },
    })
  ).toEqual({
    margin: '12px',
    '@media min-width: only screen and (min-width: var(--pbl-theme-breakpoints-sm))': {
      margin: '15px',
    },
    '@media min-width: only screen and (min-width: var(--pbl-theme-breakpoints-lg))': {
      margin: '18px',
    },
  });
});

test('Expose styled components function with "as" name', () => {
  const interpolation = system([
    {
      properties: ['margin'],
      fromProps: ['m'],
      transform: pixelTransform,
      as: 'all',
    },
  ]);
  expect(callInterpolation(interpolation.all(12))).toEqual({ margin: '12px' });
});

test('Expose styled components function without "as" name and use "properties', () => {
  const interpolation = system([
    {
      properties: ['margin'],
      fromProps: ['m'],
      transform: pixelTransform,
    },
  ]);
  expect(callInterpolation(interpolation.m(12))).toEqual({ margin: '12px' });
});

test('Expose styled components function without "as" or "fromProps name and use "properties', () => {
  const interpolation = system([
    {
      properties: ['margin'],
      transform: pixelTransform,
    },
  ]);
  expect(callInterpolation(interpolation.margin(12))).toEqual({ margin: '12px' });
});
