import { css } from 'styled-components';
import { mediaQueryBelow } from '../breakpoints/mediaQueryFns';
import { breakpoint } from './breakpoint';

test('Get media query with styles when media query was found', () => {
  const output = breakpoint(
    'md',
    css`
      background-color: red;
    `
  )({
    theme: {
      breakpoints: {
        0: 100,
        1: 200,
        2: 300,
        3: 400,
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;
  expect(output.map((s) => s.trim()).join(' ')).toEqual(
    '@media only screen and (min-width: 200px) { background-color: red; }'
  );
});

test('Get media below query with styles when media query was found', () => {
  const output = breakpoint(
    'md',
    css`
      background-color: red;
    `,
    mediaQueryBelow
  )({
    theme: {
      breakpoints: {
        0: 100,
        1: 200,
        2: 300,
        3: 400,
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;
  expect(output.map((s) => s.trim()).join(' ')).toEqual(
    '@media only screen and (max-width: 199px) { background-color: red; }'
  );
});

test('Get no media query and no responsive styles when media query was NOT found', () => {
  const output = breakpoint(
    'xxx' as any,
    css`
      background-color: red;
    `
  )({
    theme: {
      breakpoints: {
        0: 100,
        1: 200,
        2: 300,
        3: 400,
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;
  expect(output).toBeNull();
});
