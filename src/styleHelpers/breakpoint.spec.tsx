import * as React from 'react';
import { css } from '@emotion/react';
import { mediaQueryBelow } from '../breakpoints/mediaQueryFns';
import { breakpoint } from './breakpoint';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { PabloThemeProvider } from '../theme';

test('Get media query with styles when media query was found', () => {
  const output = breakpoint(
    'md',
    css`
      background-color: red;
    `
  )({
    theme: {
      breakpoints: {
        0: '100px',
        1: '200px',
        2: '300px',
        3: '400px',
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;

  const Component = styled.div`
    ${output}
  `;

  const { container } = renderComponent(Component);
  expect(container.firstChild).toHaveStyleRule('background-color', 'red', {
    media: 'only screen and (min-width: var(--pbl-theme-breakpoints-md))',
  });
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
        0: '100px',
        1: '200px',
        2: '300px',
        3: '400px',
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;

  const Component = styled.div`
    ${output}
  `;

  const { container } = renderComponent(Component);
  expect(container.firstChild).toHaveStyleRule('background-color', 'red', {
    media: 'only screen and (max-width: calc(var(--pbl-theme-breakpoints-md) - 1px))',
  });
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
        0: '100px',
        1: '200px',
        2: '300px',
        3: '400px',
        breakpointNames: ['sm', 'md', 'lg', 'xl'],
      },
    },
  } as any) as any;
  expect(output).toBeNull();
});

function renderComponent(Component) {
  return render(
    <PabloThemeProvider>
      <Component />
    </PabloThemeProvider>
  );
}
