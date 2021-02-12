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

describe('Typography component', () => {
  test.each([
    [undefined],
    ['headline'],
    ['title'],
    ['subtitle'],
    ['paragraph'],
    ['paragraphBold'],
    ['button'],
    ['info'],
    ['infoBold'],
  ])('styles with "%s" variant', (variant) => {
    const { container } = renderComponent({ variant });
    expect(container).toMatchSnapshot();
  });
});

describe('specific typography components', () => {
  test.each([
    ['Headline', Headline],
    ['Title', Title],
    ['Subtitle', Subtitle],
    ['Paragraph', Paragraph],
    ['ParagraphBold', ParagraphBold],
    ['ButtonTypography', ButtonTypography],
    ['InfoText', InfoText],
    ['InfoBold', InfoTextBold],
  ])('styles of "%s" component', (_stringName, Component) => {
    const { container } = render(
      <PabloThemeProvider>
        <Component>Hello</Component>
      </PabloThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Typography {...props}>Hello</Typography>
    </PabloThemeProvider>
  );
}
