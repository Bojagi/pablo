import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Checkbox } from './Checkbox';

let onChangeMock;

beforeEach(() => {
  onChangeMock = jest.fn();
});

afterEach(cleanup);

test('Render checkbox unchecked', () => {
  const { container, getByTestId } = renderComponent({ checked: false });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule('transform', 'scale(0)');
  expect(getByTestId('pbl-checkbox-input')).not.toBeChecked();
});

test('Render checkbox checked', () => {
  const { container, getByTestId } = renderComponent({ checked: true });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule('transform', 'scale(1)');
  expect(getByTestId('pbl-checkbox-input')).toBeChecked();
});

test('Render checkbox with label', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    label: (
      <>
        I am a <strong>label</strong>
      </>
    ),
  });
  expect(getByTestId('pbl-checkbox-label')).toBeDefined();

  // Label and input are connected via "id"
  expect(getByTestId('pbl-checkbox-label')).toHaveAttribute('for', 'custom-id');
  expect(getByTestId('pbl-checkbox-input')).toHaveAttribute('id', 'custom-id');
  expect(getByTestId('pbl-checkbox-label')).toMatchSnapshot();
  expect(getByTestId('pbl-checkbox-label')).toHaveTextContent('I am a label');
});

test('Click on checkbox to trigger onChange event', () => {
  const { getByTestId } = renderComponent({
    checked: false,
    value: 'checky',
    label: 'i am a label',
  });
  expect(onChangeMock).toHaveBeenCalledTimes(0);
  expect(getByTestId('pbl-checkbox-input')).toBeEnabled();
  act(() => {
    fireEvent.click(getByTestId('pbl-checkbox-input'), { target: { value: 'checky' } });
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith('checky', expect.objectContaining({ type: 'change' }));
});

test('Disabled prop should disable input', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    disabled: true,
  });
  expect(getByTestId('pbl-checkbox-input')).toBeDisabled();
});

test('Render medium checkbox', () => {
  const { getByTestId } = renderComponent({
    size: 'medium',
    label: 'medium label',
  });
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule(
    'width',
    /calc\(clamp\(0.75rem, .*?, 1.5rem\) \+ 2 \* \(clamp\(0.25rem, .*?, 0.5rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule(
    'height',
    /calc\(clamp\(0.75rem, .*?, 1.5rem\) \+ 2 \* \(clamp\(0.25rem, .*?, 0.5rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule('padding', /clamp\(0.25rem, .*?, 0.5rem\)/);
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule(
    'width',
    /clamp\(0.75rem, .*?, 1.5rem\)/
  );
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule(
    'height',
    /clamp\(0.75rem, .*?, 1.5rem\)/
  );
  // Uses subtitle typography
  expect(getByTestId('pbl-checkbox-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.body.fontSize
  );
});

test('Render small checkbox', () => {
  const { getByTestId } = renderComponent({
    size: 'small',
    label: 'small label',
  });
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule(
    'width',
    /calc\(clamp\(0.5rem, .*?, 1rem\) \+ 2 \* \(clamp\(0.25rem, .*?, 0.5rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule(
    'height',
    /calc\(clamp\(0.5rem, .*?, 1rem\) \+ 2 \* \(clamp\(0.25rem, .*?, 0.5rem\) \+ 1px\)\)/
  );
  expect(getByTestId('pbl-checkbox')).toHaveStyleRule('padding', /clamp\(0.25rem, .*?, 0.5rem\)/);
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule('width', /clamp\(0.5rem, .*?, 1rem\)/);
  expect(getByTestId('pbl-checkbox-handle')).toHaveStyleRule(
    'height',
    /clamp\(0.5rem, .*?, 1rem\)/
  );
  // Uses paragraph typography
  expect(getByTestId('pbl-checkbox-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.body.fontSize
  );
});

test('Use generated id when no "id" prop is set', () => {
  const { getByTestId } = renderComponent({
    id: undefined,
  });

  expect(getByTestId('pbl-checkbox-input')).toHaveAttribute('id', expect.stringMatching(/:.*?:/));
});

test('Render without onChange function ', () => {
  renderComponent({
    onChange: undefined,
  });
});

test('Forward onFocus and onBlur to input and show focus outline', () => {
  const onFocusMock = jest.fn();
  const onBlurMock = jest.fn();
  const { getByTestId } = renderComponent({
    onChange: undefined,
    checked: undefined,
    onFocus: onFocusMock,
    onBlur: onBlurMock,
  });

  expect(onFocusMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.focus(getByTestId('pbl-checkbox-input'));
  });
  expect(onFocusMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-checkbox')).toHaveStyleRule(
    'box-shadow',
    `0 0 0 3px ${themeVars.colors.brand.lightest}`
  );

  expect(onBlurMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.blur(getByTestId('pbl-checkbox-input'));
  });
  expect(onBlurMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-checkbox')).not.toHaveStyleRule(
    'box-shadow',
    `0 0 0 3px ${themeVars.colors.brand.lightest}`
  );
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Checkbox id="custom-id" onChange={onChangeMock} {...props}>
        Hello
      </Checkbox>
    </PabloThemeProvider>
  );
}
