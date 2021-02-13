import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Avatar } from './Avatar';

describe.each([
  ['square', '6px'],
  ['circle', '50%'],
])('%s variant', (variant, expectedBorderRadius) => {
  test.each([
    ['tiny', 24],
    ['small', 32],
    ['medium', 40],
    ['large', 64],
  ])('Render size %s', (size, extendedSize) => {
    const { container, getByTestId } = renderComponent({
      variant,
      size,
    });
    expect(container).toMatchSnapshot();
    expect(getByTestId('pbl-avatar')).toHaveStyleRule('width', `${extendedSize}px`);
    expect(getByTestId('pbl-avatar')).toHaveStyleRule('height', `${extendedSize}px`);
    expect(getByTestId('pbl-avatar')).toHaveStyleRule('height', `${extendedSize}px`);
    expect(getByTestId('pbl-avatar')).toHaveStyleRule('border-radius', expectedBorderRadius);
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Avatar data-testid="pbl-avatar" {...props} />
    </PabloThemeProvider>
  );
}
