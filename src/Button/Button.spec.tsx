import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Button } from './Button';

afterEach(cleanup);

test.each([
  [
    'primary',
    'brand',
    {
      color: themeVars.colors.brand.contrastText,
      backgroundColor: themeVars.colors.brand.main,
      borderColor: themeVars.colors.brand.main,
      hoverBackgroundColor: themeVars.colors.brand.dark,
      hoverBorderColor: themeVars.colors.brand.dark,
    },
  ],
  [
    'primaryInverted',
    'brand',
    {
      color: themeVars.colors.brand.main,
      backgroundColor: themeVars.colors.brand.contrastText,
      borderColor: themeVars.colors.brand.contrastText,
      hoverBackgroundColor: themeVars.colors.brand.lightest,
      hoverBorderColor: themeVars.colors.brand.lightest,
    },
  ],
  [
    'secondary',
    'brand',
    {
      color: themeVars.colors.brand.dark,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.brand.dark,
      hoverBackgroundColor: themeVars.colors.brand.lightest,
      hoverBorderColor: themeVars.colors.brand.darkest,
    },
  ],
  [
    'secondaryInverted',
    'brand',
    {
      color: themeVars.colors.brand.contrastText,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.brand.contrastText,
      hoverBackgroundColor: themeVars.colors.brand.dark,
      hoverBorderColor: themeVars.colors.brand.contrastText,
    },
  ],
  [
    'text',
    'brand',
    {
      color: themeVars.colors.brand.dark,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.brand.lightest,
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'textInverted',
    'brand',
    {
      color: themeVars.colors.brand.contrastText,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.brand.dark,
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'primary',
    'plain',
    {
      color: themeVars.colors.common.black,
      backgroundColor: themeVars.colors.gray['50'],
      borderColor: themeVars.colors.gray['100'],
      hoverBackgroundColor: themeVars.colors.gray['100'],
      hoverBorderColor: themeVars.colors.gray['200'],
    },
  ],
  [
    'primaryInverted',
    'plain',
    {
      color: themeVars.colors.common.black,
      backgroundColor: themeVars.colors.common.white,
      borderColor: themeVars.colors.common.white,
      hoverBackgroundColor: themeVars.colors.gray['50'],
      hoverBorderColor: themeVars.colors.gray['50'],
    },
  ],
  [
    'secondary',
    'plain',
    {
      color: themeVars.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.common.black,
      hoverBackgroundColor: themeVars.colors.gray['50'],
      hoverBorderColor: themeVars.colors.common.black,
    },
  ],
  [
    'secondaryInverted',
    'plain',
    {
      color: themeVars.colors.common.white,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.common.white,
      hoverBackgroundColor: themeVars.colors.gray['800'],
      hoverBorderColor: themeVars.colors.common.white,
    },
  ],
  [
    'text',
    'plain',
    {
      color: themeVars.colors.common.black,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.gray['50'],
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'textInverted',
    'plain',
    {
      color: themeVars.colors.common.white,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.gray['800'],
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'primary',
    'negative',
    {
      color: themeVars.colors.negative.contrastText,
      backgroundColor: themeVars.colors.negative.main,
      borderColor: themeVars.colors.negative.main,
      hoverBackgroundColor: themeVars.colors.negative.dark,
      hoverBorderColor: themeVars.colors.negative.dark,
    },
  ],
  [
    'primaryInverted',
    'negative',
    {
      color: themeVars.colors.negative.main,
      backgroundColor: themeVars.colors.negative.contrastText,
      borderColor: themeVars.colors.negative.contrastText,
      hoverBackgroundColor: themeVars.colors.negative.lightest,
      hoverBorderColor: themeVars.colors.negative.lightest,
    },
  ],
  [
    'secondary',
    'negative',
    {
      color: themeVars.colors.negative.dark,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.negative.dark,
      hoverBackgroundColor: themeVars.colors.negative.lightest,
      hoverBorderColor: themeVars.colors.negative.darkest,
    },
  ],
  [
    'secondaryInverted',
    'negative',
    {
      color: themeVars.colors.negative.contrastText,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.negative.contrastText,
      hoverBackgroundColor: themeVars.colors.negative.dark,
      hoverBorderColor: themeVars.colors.negative.contrastText,
    },
  ],
  [
    'text',
    'negative',
    {
      color: themeVars.colors.negative.dark,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.negative.lightest,
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'textInverted',
    'negative',
    {
      color: themeVars.colors.negative.contrastText,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.negative.dark,
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'primary',
    'positive',
    {
      color: themeVars.colors.positive.contrastText,
      backgroundColor: themeVars.colors.positive.main,
      borderColor: themeVars.colors.positive.main,
      hoverBackgroundColor: themeVars.colors.positive.dark,
      hoverBorderColor: themeVars.colors.positive.dark,
    },
  ],
  [
    'primaryInverted',
    'positive',
    {
      color: themeVars.colors.positive.main,
      backgroundColor: themeVars.colors.positive.contrastText,
      borderColor: themeVars.colors.positive.contrastText,
      hoverBackgroundColor: themeVars.colors.positive.lightest,
      hoverBorderColor: themeVars.colors.positive.lightest,
    },
  ],
  [
    'secondary',
    'positive',
    {
      color: themeVars.colors.positive.dark,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.positive.dark,
      hoverBackgroundColor: themeVars.colors.positive.lightest,
      hoverBorderColor: themeVars.colors.positive.darkest,
    },
  ],
  [
    'secondaryInverted',
    'positive',
    {
      color: themeVars.colors.positive.contrastText,
      backgroundColor: 'transparent',
      borderColor: themeVars.colors.positive.contrastText,
      hoverBackgroundColor: themeVars.colors.positive.dark,
      hoverBorderColor: themeVars.colors.positive.contrastText,
    },
  ],
  [
    'text',
    'positive',
    {
      color: themeVars.colors.positive.dark,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.positive.lightest,
      hoverBorderColor: 'transparent',
    },
  ],
  [
    'textInverted',
    'positive',
    {
      color: themeVars.colors.positive.contrastText,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hoverBackgroundColor: themeVars.colors.positive.dark,
      hoverBorderColor: 'transparent',
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
      modifier: ':hover:enabled',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:enabled',
    }
  );
});

test('Render primary brand button when no variant or color is given', () => {
  const expectedStyles = {
    color: themeVars.colors.brand.contrastText,
    backgroundColor: themeVars.colors.brand.main,
    borderColor: themeVars.colors.brand.main,
    hoverBackgroundColor: themeVars.colors.brand.dark,
    hoverBorderColor: themeVars.colors.brand.dark,
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
      modifier: ':hover:enabled',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:enabled',
    }
  );
});

test('Render primary brand button when unknown variant is given', () => {
  const expectedStyles = {
    color: themeVars.colors.brand.contrastText,
    backgroundColor: themeVars.colors.brand.main,
    borderColor: themeVars.colors.brand.main,
    hoverBackgroundColor: themeVars.colors.brand.dark,
    hoverBorderColor: themeVars.colors.brand.dark,
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
      modifier: ':hover:enabled',
    }
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule(
    'background',
    expectedStyles.hoverBackgroundColor,
    {
      modifier: ':hover:enabled',
    }
  );
});

test('render button with full width', () => {
  const { getByTestId } = renderComponent({ fullWidth: true });
  expect(getByTestId('pbl-button')).toHaveStyleRule('width', '100%');
});

test('render button with start icon', () => {
  const { container, getByTestId } = renderComponent({ startIcon: <div>myIcon</div> });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-button-icon')).toBeDefined();
  expect(getByTestId('pbl-button-icon')).toHaveStyleRule('margin-right', '8px');
});

test('render button with end icon', () => {
  const { container, getByTestId } = renderComponent({ endIcon: <div>myIcon</div> });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-button-icon')).toBeDefined();
  expect(getByTestId('pbl-button-icon')).toHaveStyleRule('margin-left', '8px');
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
