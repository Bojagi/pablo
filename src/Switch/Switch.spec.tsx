import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Switch } from './Switch';

let onChangeMock;

beforeEach(() => {
  onChangeMock = vi.fn();
});

test('Render switch unchecked', () => {
  const { container, getByTestId } = renderComponent({ checked: false });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule('transform', /translateX\(\s*?0\s*?\)/);
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule(
    'background-color',
    themeVars.colors.gray['500']
  );
  expect(getByTestId('pbl-switch-input')).not.toBeChecked();
});

test('Render switch checked', () => {
  const { container, getByTestId } = renderComponent({ checked: true });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule(
    'transform',
    /translateX\(\s*?18px\s*?\)/
  );
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule(
    'background-color',
    themeVars.colors.brand.main
  );
  expect(getByTestId('pbl-switch-input')).toBeChecked();
});

test('Render switch with label', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    label: (
      <>
        I am a <strong>label</strong>
      </>
    ),
  });
  expect(getByTestId('pbl-switch-label')).toBeDefined();

  // Label and input are connected via "id"
  expect(getByTestId('pbl-switch-label')).toHaveAttribute('for', 'custom-id');
  expect(getByTestId('pbl-switch-input')).toHaveAttribute('id', 'custom-id');
  expect(getByTestId('pbl-switch-label')).toMatchSnapshot();
  expect(getByTestId('pbl-switch-label')).toHaveTextContent('I am a label');
});

test('Click on switch to trigger onChange event', () => {
  const { getByTestId } = renderComponent({
    checked: false,
    value: 'checky',
  });
  expect(onChangeMock).toHaveBeenCalledTimes(0);
  expect(getByTestId('pbl-switch-input')).toBeEnabled();
  act(() => {
    fireEvent.click(getByTestId('pbl-switch-input'), { target: { value: 'checky' } });
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith('checky', expect.objectContaining({ type: 'change' }));
});

test('Disabled prop should disable input', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    disabled: true,
  });
  expect(getByTestId('pbl-switch-input')).toBeDisabled();
});

test('Render medium switch', () => {
  const { getByTestId } = renderComponent({
    size: 'medium',
    label: 'medium label',
  });
  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'width',
    /calc\(2 \* 18px \+ 2 \* \(clamp\(0.125rem, .*?, 0.1875rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'height',
    /calc\(1 \* 18px \+ 2 \* \(clamp\(0.125rem, .*?, 0.1875rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-switch')).toHaveStyleRule('padding', /clamp\(0.125rem, .*?, 0.1875rem\)/);
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule('width', '18px');
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule('height', '18px');
  // Uses subtitle typography
  expect(getByTestId('pbl-switch-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.body.fontSize
  );
});

test('Render small switch', () => {
  const { getByTestId } = renderComponent({
    size: 'small',
    label: 'small label',
  });
  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'width',
    /calc\(2 \* 12px \+ 2 \* \(clamp\(0\.125rem, .*?, 0\.1875rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'height',
    /calc\(1 \* 12px \+ 2 \* \(clamp\(0\.125rem, .*?, 0\.1875rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'padding',
    /clamp\(0\.125rem, .*?, 0\.1875rem\)/
  );
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule('width', '12px');
  expect(getByTestId('pbl-switch-handle')).toHaveStyleRule('height', '12px');
  // Uses paragraph typography
  expect(getByTestId('pbl-switch-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.body.fontSize
  );
});

test('Use generated id when no "id" prop is set', () => {
  const { getByTestId } = renderComponent({
    id: undefined,
  });

  expect(getByTestId('pbl-switch-input')).toHaveAttribute('id', expect.stringMatching(/:.*?:/));
});

test('Render without onChange function ', () => {
  renderComponent({
    onChange: undefined,
  });
});

test('Forward onFocus and onBlur to input and show focus outline', () => {
  const onFocusMock = vi.fn();
  const onBlurMock = vi.fn();
  const { getByTestId } = renderComponent({
    onChange: undefined,
    checked: undefined,
    onFocus: onFocusMock,
    onBlur: onBlurMock,
  });

  expect(onFocusMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.focus(getByTestId('pbl-switch-input'));
  });
  expect(onFocusMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-switch')).toHaveStyleRule(
    'box-shadow',
    `0 0 0 3px ${themeVars.colors.brand.lightest}`
  );

  expect(onBlurMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.blur(getByTestId('pbl-switch-input'));
  });
  expect(onBlurMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-switch')).not.toHaveStyleRule(
    'box-shadow',
    `0 0 0 3px ${themeVars.colors.brand.lightest}`
  );
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Switch id="custom-id" onChange={onChangeMock} {...props}>
        Hello
      </Switch>
    </PabloThemeProvider>
  );
}
