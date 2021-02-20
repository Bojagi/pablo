import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { defaultTheme, PabloThemeProvider } from '../theme';
import { Button } from './Button';

afterEach(cleanup);

test.each([
  [
    'primary',
    'brand',
    {
      color: defaultTheme.colors.common.white,
      backgroundColor: defaultTheme.colors.brand.main,
      borderColor: defaultTheme.colors.brand.main,
      hoverBackgroundColor: defaultTheme.colors.brand.darkest,
      hoverBorderColor: defaultTheme.colors.brand.darkest,
    },
  ],
  [
    'secondary',
    'brand',
    {
      color: defaultTheme.colors.brand.main,
      backgroundColor: 'transparent',
      borderColor: defaultTheme.colors.brand.main,
      hoverBackgroundColor: defaultTheme.colors.brand.lightest,
      hoverBorderColor: undefined,
    },
  ],
  [
    'text',
    'brand',
    {
      color: defaultTheme.colors.brand.main,
      backgroundColor: 'transparent',
      borderColor: undefined,
      hoverBackgroundColor: defaultTheme.colors.brand.lightest,
      hoverBorderColor: undefined,
    },
  ],
  [
    'primary',
    'plain',
    {
      color: defaultTheme.colors.common.black,
      backgroundColor: defaultTheme.colors.gray['50'],
      borderColor: defaultTheme.colors.gray['100'],
      hoverBackgroundColor: defaultTheme.colors.gray['100'],
      hoverBorderColor: defaultTheme.colors.gray['200'],
    },
  ],
  [
    'secondary',
    'plain',
    {
      color: defaultTheme.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: defaultTheme.colors.common.black,
      hoverBackgroundColor: defaultTheme.colors.gray['50'],
      hoverBorderColor: undefined,
    },
  ],
  [
    'text',
    'plain',
    {
      color: defaultTheme.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: undefined,
      hoverBackgroundColor: defaultTheme.colors.gray['50'],
      hoverBorderColor: undefined,
    },
  ],
  [
    'primary',
    'negative',
    {
      color: defaultTheme.colors.common.white,
      backgroundColor: defaultTheme.colors.negative.main,
      borderColor: defaultTheme.colors.negative.main,
      hoverBackgroundColor: defaultTheme.colors.negative.darkest,
      hoverBorderColor: defaultTheme.colors.negative.darkest,
    },
  ],
  [
    'secondary',
    'negative',
    {
      color: defaultTheme.colors.negative.main,
      backgroundColor: 'transparent',
      borderColor: defaultTheme.colors.negative.main,
      hoverBackgroundColor: defaultTheme.colors.negative.lightest,
      hoverBorderColor: undefined,
    },
  ],
  [
    'text',
    'negative',
    {
      color: defaultTheme.colors.negative.main,
      backgroundColor: 'transparent',
      borderColor: undefined,
      hoverBackgroundColor: defaultTheme.colors.negative.lightest,
      hoverBorderColor: undefined,
    },
  ],
  [
    'primary',
    'positive',
    {
      color: defaultTheme.colors.common.white,
      backgroundColor: defaultTheme.colors.positive.main,
      borderColor: defaultTheme.colors.positive.main,
      hoverBackgroundColor: defaultTheme.colors.positive.darkest,
      hoverBorderColor: defaultTheme.colors.positive.darkest,
    },
  ],
  [
    'secondary',
    'positive',
    {
      color: defaultTheme.colors.positive.main,
      backgroundColor: 'transparent',
      borderColor: defaultTheme.colors.positive.main,
      hoverBackgroundColor: defaultTheme.colors.positive.lightest,
      hoverBorderColor: undefined,
    },
  ],
  [
    'text',
    'positive',
    {
      color: defaultTheme.colors.positive.main,
      backgroundColor: 'transparent',
      borderColor: undefined,
      hoverBackgroundColor: defaultTheme.colors.positive.lightest,
      hoverBorderColor: undefined,
    },
  ],
])('render %s %s color button', (variant, color, expectedStyles) => {
  const { container, getByTestId } = renderComponent({ variant, color });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-button')).toBeEnabled();
  expect(getByTestId('pbl-button')).toHaveStyleRule('background', expectedStyles.backgroundColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule('color', expectedStyles.color);
  expect(getByTestId('pbl-button')).toHaveStyleRule('border-color', expectedStyles.borderColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'border-color',
    expectedStyles.hoverBorderColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
});

test('Render primary brand button when no variant or color is given', () => {
  const expectedStyles = {
    color: defaultTheme.colors.common.white,
    backgroundColor: defaultTheme.colors.brand.main,
    borderColor: defaultTheme.colors.brand.main,
    hoverBackgroundColor: defaultTheme.colors.brand.darkest,
    hoverBorderColor: defaultTheme.colors.brand.darkest,
  };

  const { getByTestId } = renderComponent({});
  expect(getByTestId('pbl-button')).toBeEnabled();
  expect(getByTestId('pbl-button')).toHaveStyleRule('background', expectedStyles.backgroundColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule('color', expectedStyles.color);
  expect(getByTestId('pbl-button')).toHaveStyleRule('border-color', expectedStyles.borderColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'border-color',
    expectedStyles.hoverBorderColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
});

test('Render primary brand button when unknown variant is given', () => {
  const expectedStyles = {
    color: defaultTheme.colors.common.white,
    backgroundColor: defaultTheme.colors.brand.main,
    borderColor: defaultTheme.colors.brand.main,
    hoverBackgroundColor: defaultTheme.colors.brand.darkest,
    hoverBorderColor: defaultTheme.colors.brand.darkest,
  };

  const { getByTestId } = renderComponent({ variant: 'unknown' });
  expect(getByTestId('pbl-button')).toBeEnabled();
  expect(getByTestId('pbl-button')).toHaveStyleRule('background', expectedStyles.backgroundColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule('color', expectedStyles.color);
  expect(getByTestId('pbl-button')).toHaveStyleRule('border-color', expectedStyles.borderColor);
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'border-color',
    expectedStyles.hoverBorderColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:not(:disabled)',
    }
  );
});

test('render button with icon', () => {
  const { container, getByTestId } = renderComponent({ icon: <div>myIcon</div> });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-button-icon')).toBeDefined();
});

test('disable button element when disabled prop is true', () => {
  const { getByTestId } = renderComponent({ disabled: true });
  expect(getByTestId('pbl-button')).toBeDisabled();
  expect(getByTestId('pbl-button')).toHaveStyleRule('opacity', '0.4', {
    modifier: ':disabled',
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Button {...props}>Hello</Button>
    </PabloThemeProvider>
  );
}
