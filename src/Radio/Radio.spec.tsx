import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Radio } from './Radio';

let onChangeMock;

beforeEach(() => {
  onChangeMock = jest.fn();
});

afterEach(cleanup);

test('Render radio unchecked', () => {
  const { container, getByTestId } = renderComponent({ checked: false });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('transform', 'scale(0)');
  expect(getByTestId('pbl-radio-input')).not.toBeChecked();
});

test('Render radio checked', () => {
  const { container, getByTestId } = renderComponent({ checked: true });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('transform', 'scale(1)');
  expect(getByTestId('pbl-radio-input')).toBeChecked();
});

test('Render radio with label', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    label: (
      <>
        I am a <strong>label</strong>
      </>
    ),
  });
  expect(getByTestId('pbl-radio-label')).toBeDefined();

  // Label and input are connected via "id"
  expect(getByTestId('pbl-radio-label')).toHaveAttribute('for', 'custom-id');
  expect(getByTestId('pbl-radio-input')).toHaveAttribute('id', 'custom-id');
  expect(getByTestId('pbl-radio-label')).toMatchSnapshot();
  expect(getByTestId('pbl-radio-label')).toHaveTextContent('I am a label');
});

test('Click on radio to trigger onChange event', () => {
  const { getByTestId } = renderComponent({
    checked: false,
    value: 'radio',
    label: 'i am a label',
  });
  expect(onChangeMock).toHaveBeenCalledTimes(0);
  expect(getByTestId('pbl-radio-input')).toBeEnabled();

  act(() => {
    fireEvent.click(getByTestId('pbl-radio-input'), { target: { value: 'radio' } });
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith('radio', expect.objectContaining({ type: 'change' }));
});

test('Disabled prop should disable input', () => {
  const { getByTestId } = renderComponent({
    checked: true,
    disabled: true,
  });
  expect(getByTestId('pbl-radio-input')).toBeDisabled();
});

test('Render medium radio', () => {
  const { getByTestId } = renderComponent({
    size: 'medium',
    label: 'medium label',
  });
  expect(getByTestId('pbl-radio')).toHaveStyleRule('width', 'calc(12px + 2 * (6px + 1px))');
  expect(getByTestId('pbl-radio')).toHaveStyleRule('height', 'calc(12px + 2 * (6px + 1px))');
  expect(getByTestId('pbl-radio')).toHaveStyleRule('padding', '6px');
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('width', '12px');
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('height', '12px');
  // Uses subtitle typography
  expect(getByTestId('pbl-radio-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.subtitle.fontSize
  );
});

test('Render small radio', () => {
  const { getByTestId } = renderComponent({
    size: 'small',
    label: 'small label',
  });
  expect(getByTestId('pbl-radio')).toHaveStyleRule('width', 'calc(8px + 2 * (4px + 1px))');
  expect(getByTestId('pbl-radio')).toHaveStyleRule('height', 'calc(8px + 2 * (4px + 1px))');
  expect(getByTestId('pbl-radio')).toHaveStyleRule('padding', '4px');
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('width', '8px');
  expect(getByTestId('pbl-radio-handle')).toHaveStyleRule('height', '8px');
  // Uses paragraph typography
  expect(getByTestId('pbl-radio-label')).toHaveStyleRule(
    'font-size',
    themeVars.typography.paragraph.fontSize
  );
});

test('Use generated id when no "id" prop is set', () => {
  const { getByTestId } = renderComponent({
    id: undefined,
  });

  expect(getByTestId('pbl-radio-input')).toHaveAttribute('id', expect.stringMatching(/:.*?:/));
});

test('Render without onChange function ', () => {
  renderComponent({
    onChange: undefined,
    checked: undefined,
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
    fireEvent.focus(getByTestId('pbl-radio-input'));
  });
  expect(onFocusMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-radio')).toHaveStyleRule(
    'box-shadow',
    `0 0 0 3px ${themeVars.colors.brand.lightest}`
  );

  expect(onBlurMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.blur(getByTestId('pbl-radio-input'));
  });
  expect(onBlurMock).toHaveBeenCalledTimes(1);

  expect(getByTestId('pbl-radio')).toHaveStyleRule('box-shadow', undefined);
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Radio id="custom-id" onChange={onChangeMock} {...props}>
        Hello
      </Radio>
    </PabloThemeProvider>
  );
}
