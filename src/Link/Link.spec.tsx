import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Link } from './Link';

test('Render Link with the right styles', () => {
  const { container } = renderComponent({});
  const linkElem = container.firstChild;
  expect(linkElem).toMatchSnapshot();

  // Normal state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main);
  expect(linkElem).toHaveStyleRule('text-decoration', 'none');
  expect(linkElem).toHaveStyleRule('font-style', 'normal');
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit');

  // Hover state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main, {
    target: ':hover',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'underline', {
    target: ':hover',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    target: ':hover',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    target: ':hover',
  });

  // Focus state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main, {
    target: ':focus',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'underline', {
    target: ':focus',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    target: ':focus',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    target: ':focus',
  });

  // Visited state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main, {
    target: ':visited',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'none', {
    target: ':visited',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    target: ':visited',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    target: ':visited',
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Link href="https://hello.goodbye" {...props}>
        Hello
      </Link>
    </PabloThemeProvider>
  );
}
