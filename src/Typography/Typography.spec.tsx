import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import {
  ButtonTypography,
  Headline,
  InfoText,
  InfoTextBold,
  Paragraph,
  ParagraphBold,
  Subtitle,
  Title,
  Typography,
} from './Typography';

describe.each([
  [undefined],
  ['headline'],
  ['title'],
  ['subtitle'],
  ['paragraph'],
  ['paragraphBold'],
  ['button'],
  ['info'],
  ['infoBold'],
])('Typography component with variant %s', (variant) => {
  test('Render component', () => {
    const { container } = renderComponent({ variant });
    expect(container).toMatchSnapshot();
  });

  test('Render inline component', () => {
    const { container } = renderComponent({ variant, inline: true });
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '0');
  });
});

describe.each([
  ['Headline', Headline],
  ['Title', Title],
  ['Subtitle', Subtitle],
  ['Paragraph', Paragraph],
  ['ParagraphBold', ParagraphBold],
  ['ButtonTypography', ButtonTypography],
  ['InfoText', InfoText],
  ['InfoBold', InfoTextBold],
])('%s component ', (_stringName, Component) => {
  test('Render component', () => {
    const { container } = render(
      <PabloThemeProvider>
        <Component>Hello</Component>
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
