import { render } from '@testing-library/react';
import React from 'react';
import { IconButton } from './IconButton';
import { defaultTheme, PabloThemeProvider } from '../theme';

test.each([
  ['small', '24px', '20px'],
  ['medium', '32px', '28px'],
  ['large', '40px', '36px'],
])(
  'Render %s icon button with correct styles',
  (sizeName, expectedButtonSize, expectedIconSize) => {
    const { container } = renderComponent({ size: sizeName });
    const buttonNode = container.firstChild;
    expect(buttonNode).toMatchSnapshot();
    // Button
    expect(buttonNode).toHaveStyleRule('width', expectedButtonSize);
    expect(buttonNode).toHaveStyleRule('height', expectedButtonSize);
    expect(buttonNode).toHaveStyleRule('background-color', 'transparent');
    expect(buttonNode).toHaveStyleRule('color', defaultTheme.colors.common.black);

    expect(buttonNode).toHaveStyleRule('background-color', defaultTheme.colors.blackOpacity['50'], {
      modifier: ':hover:enabled',
    });
    expect(buttonNode).toHaveStyleRule('color', defaultTheme.colors.common.black, {
      modifier: ':hover:enabled',
    });

    expect(buttonNode).toHaveStyleRule(
      'background-color',
      defaultTheme.colors.blackOpacity['100'],
      {
        modifier: ':focus:enabled',
      }
    );
    expect(buttonNode).toHaveStyleRule('color', defaultTheme.colors.common.black, {
      modifier: ':focus:enabled',
    });

    // Icon
    expect(buttonNode).toHaveStyleRule('transform', 'scale( 1 )', {
      modifier: '> *',
    });
    expect(buttonNode).toHaveStyleRule('width', expectedIconSize, {
      modifier: '> *',
    });
    expect(buttonNode).toHaveStyleRule('height', expectedIconSize, {
      modifier: '> *',
    });
  }
);

test('Render active with correct styles', () => {
  const { container } = renderComponent({ active: true });
  const buttonNode = container.firstChild;
  // Button
  expect(buttonNode).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(buttonNode).toHaveStyleRule('color', defaultTheme.colors.common.white);

  // Icon
  expect(buttonNode).toHaveStyleRule('transform', 'scale( 0.833333333 )', {
    modifier: '> *',
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <IconButton {...props}>
        <div>Icon</div>
      </IconButton>
    </PabloThemeProvider>
  );
}
