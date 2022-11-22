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
    modifier: ':hover',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'underline', {
    modifier: ':hover',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    modifier: ':hover',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    modifier: ':hover',
  });

  // Focus state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main, {
    modifier: ':focus',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'underline', {
    modifier: ':focus',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    modifier: ':focus',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    modifier: ':focus',
  });

  // Visited state
  expect(linkElem).toHaveStyleRule('color', themeVars.colors.brand.main, {
    modifier: ':visited',
  });
  expect(linkElem).toHaveStyleRule('text-decoration', 'none', {
    modifier: ':visited',
  });
  expect(linkElem).toHaveStyleRule('font-style', 'normal', {
    modifier: ':visited',
  });
  expect(linkElem).toHaveStyleRule('font-weight', 'inherit', {
    modifier: ':visited',
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
