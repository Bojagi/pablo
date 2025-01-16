import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Headline, InfoText, Paragraph, Subtitle, Title, Typography } from './Typography';

describe.each([
  [undefined, {}],
  [undefined, { bold: true }],
  [undefined, { bold: true, small: true }],
  ['h1', {}],
  ['h2', {}],
  ['h3', {}],
  ['h4', {}],
  ['body', {}],
  ['body', { bold: true }],
  ['body', { small: true }],
  ['body', { bold: true, small: true }],
  ['button', {}],
  ['button', { small: true }],
])('Typography component with variant %s', (variant, props) => {
  test('Render component', () => {
    const { container } = renderComponent({ variant, ...props });
    expect(container).toMatchSnapshot();
  });

  test('Render inline component', () => {
    const { container } = renderComponent({ variant, inline: true, ...props });
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '0');
  });
});

describe.each([
  ['Headline', Headline, {}],
  ['Title', Title, {}],
  ['Subtitle', Subtitle, {}],
  ['Paragraph', Paragraph, {}],
  ['ParagraphBold', Paragraph, { bold: true }],
  ['InfoText', InfoText, { bold: true }],
])('%s component ', (_stringName, Component, props) => {
  test('Render component', () => {
    const { container } = render(
      <PabloThemeProvider>
        <Component {...props}>Hello</Component>
      </PabloThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  test('Render inline component', () => {
    const { container } = render(
      <PabloThemeProvider>
        <Component inline>Hello</Component>
      </PabloThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '0');
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Typography {...props}>Hello</Typography>
    </PabloThemeProvider>
  );
}
