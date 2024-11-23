import { render } from '@testing-library/react';
import React from 'react';
import { IconButton } from './IconButton';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';

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
    expect(buttonNode).toHaveStyleRule('color', themeVars.colors.common.black);

    expect(buttonNode).toHaveStyleRule('background-color', themeVars.colors.blackOpacity['50'], {
      target: ':hover:enabled',
    });
    expect(buttonNode).toHaveStyleRule('color', themeVars.colors.common.black, {
      target: ':hover:enabled',
    });

    expect(buttonNode).toHaveStyleRule('background-color', themeVars.colors.blackOpacity['100'], {
      target: ':focus:enabled',
    });
    expect(buttonNode).toHaveStyleRule('color', themeVars.colors.common.black, {
      target: ':focus:enabled',
    });

    // Icon
    expect(buttonNode).toHaveStyleRule('transform', /scale\(\s*1\s*\)/, {
      target: '>*',
    });
    expect(buttonNode).toHaveStyleRule('width', expectedIconSize, {
      target: '>*',
    });
    expect(buttonNode).toHaveStyleRule('height', expectedIconSize, {
      target: '>*',
    });
  }
);

test('Render active with correct styles', () => {
  const { container } = renderComponent({ active: true });
  const buttonNode = container.firstChild;
  // Button
  expect(buttonNode).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(buttonNode).toHaveStyleRule('color', themeVars.colors.common.white);

  // Icon
  expect(buttonNode).toHaveStyleRule('transform', /scale\(\s*0.833333333\s*\)/, {
    target: '>*',
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
