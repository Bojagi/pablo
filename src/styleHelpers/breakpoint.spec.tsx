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
      breakpoints: new Map([
        ['sm', 100],
        ['md', 200],
        ['lg', 300],
        ['xl', 400],
      ]),
    },
  } as any) as any;

  const Component = styled.div`
    ${output}
  `;

  const { container } = renderComponent(Component);
  expect(container.firstChild).toHaveStyleRule('background-color', 'red', {
    media: 'only screen and (min-width: 200px)',
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
      breakpoints: new Map([
        ['sm', 100],
        ['md', 200],
        ['lg', 300],
        ['xl', 400],
      ]),
    },
  } as any) as any;

  const Component = styled.div`
    ${output}
  `;

  const { container } = renderComponent(Component);
  expect(container.firstChild).toHaveStyleRule('background-color', 'red', {
    media: 'only screen and (max-width: 199px)',
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
      breakpoints: new Map([
        ['sm', '100px'],
        ['md', '200px'],
        ['lg', '300px'],
        ['xl', '400px'],
      ]),
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
