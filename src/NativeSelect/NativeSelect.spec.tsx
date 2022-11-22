import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { NativeSelect } from './NativeSelect';

test('Render without value', () => {
  const { container, getByTestId } = renderComponent({});
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-nativeSelect')).not.toHaveValue();
});

test('Render with value', () => {
  const { getByTestId } = renderComponent({ value: 'some' });
  expect(getByTestId('pbl-nativeSelect')).toHaveValue('some');
});

test('Show label when available', () => {
  const { container, getByTestId } = renderComponent({
    value: 'some',
    label: (
      <>
        Your <strong>name</strong>
      </>
    ),
  });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-nativeSelect-label')).toHaveTextContent('Your name');
});

test('Show infotext when available', () => {
  const { container, getByTestId } = renderComponent({
    value: 'some',
    infoText: (
      <>
        Something that <strong>helps</strong>
      </>
    ),
  });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-nativeSelect-infotext')).toHaveTextContent('Something that helps');
});

test('Show error when an error message is given', () => {
  const { container, getByTestId } = renderComponent({
    value: 'some',
    error: (
      <>
        Something <strong>terrible</strong> happened!
      </>
    ),
  });
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-nativeSelect-infotext')).toHaveTextContent(
    'Something terrible happened!'
  );
});

test('Show error instead of infotext when both are set', () => {
  const { getByTestId } = renderComponent({
    value: 'some',
    error: (
      <>
        Something <strong>terrible</strong> happened!
      </>
    ),
    infoText: (
      <>
        something that <strong>helps</strong>
      </>
    ),
  });
  expect(getByTestId('pbl-nativeSelect-infotext')).toHaveTextContent(
    'Something terrible happened!'
  );
});

test('Render with custom width when "width" prop is set', () => {
  const { getByTestId } = renderComponent({
    width: '600em',
  });

  expect(getByTestId('pbl-nativeSelect-wrapper')).toHaveStyleRule('width', '600em');
});

test('Render with custom px width when number "width" prop is set', () => {
  const { getByTestId } = renderComponent({
    width: 600,
  });

  expect(getByTestId('pbl-nativeSelect-wrapper')).toHaveStyleRule('width', '600px');
});

test('Render with width auto when "fullWidth" prop is set', () => {
  const { getByTestId } = renderComponent({
    width: 600,
    fullWidth: true,
  });

  expect(getByTestId('pbl-nativeSelect-wrapper')).toHaveStyleRule('width', 'auto');
});

test('Trigger onChange event when the content of the inner input changed', () => {
  const onChangeMock = jest.fn();
  const { getByTestId } = renderComponent({
    value: 'some',
    onChange: onChangeMock,
  });

  expect(onChangeMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.change(getByTestId('pbl-nativeSelect'), { target: { value: 'otherValue' } });
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(
    'otherValue',
    expect.objectContaining({ type: 'change' })
  );
});

test('Use generated id when no "id" prop is set', () => {
  const onChangeMock = jest.fn();
  const { getByTestId } = renderComponent({
    value: 'some',
    id: undefined,
    onChange: onChangeMock,
  });

  expect(getByTestId('pbl-nativeSelect')).toHaveAttribute(
    'id',
    expect.stringContaining('pbl-nativeSelect-')
  );
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <NativeSelect id="custom-id" {...props}>
        <option value="">---</option>
        <option value="some">Some</option>
        <option value="otherValue">Other</option>
      </NativeSelect>
    </PabloThemeProvider>
  );
}
