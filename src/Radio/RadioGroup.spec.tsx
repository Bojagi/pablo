import { act, fireEvent, render, cleanup } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { RadioGroup } from './RadioGroup';
import { Radio } from './Radio';

let onChangeMock;

beforeEach(() => {
  onChangeMock = jest.fn();
});

afterEach(cleanup);

test('Work with one radio button', () => {
  const { container } = render(
    <PabloThemeProvider>
      <RadioGroup onChange={onChangeMock} name="greeting">
        <Radio id="custom-id" label="Hello" value="hello" />
      </RadioGroup>
    </PabloThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Render with nothing selected', () => {
  const { container, getAllByTestId } = renderComponent({ name: 'greeting' });
  expect(container).toMatchSnapshot();
  const allRadios = getAllByTestId('pbl-radio-input');
  expect(allRadios).toHaveLength(3);
  expect(allRadios[0]).not.toBeChecked();
  expect(allRadios[1]).not.toBeChecked();
  expect(allRadios[2]).not.toBeChecked();
  expect(allRadios[0]).toHaveAttribute('name', 'greeting');
  expect(allRadios[1]).toHaveAttribute('name', 'greeting');
  expect(allRadios[2]).toHaveAttribute('name', 'greeting');
});

test('Render with "world" selected', () => {
  const { getAllByTestId } = renderComponent({ value: 'world' });
  const allRadios = getAllByTestId('pbl-radio-input');
  expect(allRadios).toHaveLength(3);
  expect(allRadios[0]).not.toBeChecked();
  expect(allRadios[1]).toBeChecked();
  expect(allRadios[2]).not.toBeChecked();
});

test('Click on "bye" and trigger "bye" being selected', () => {
  const { getByText, getAllByTestId, rerender } = renderComponent({ value: 'world' });
  const byeLabel = getByText('Bye');

  // Click on label to trigger 'bye' being checked
  expect(onChangeMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(byeLabel as any);
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith('bye');

  // Rerender with value being 'bye'
  rerender(getRenderHtml({ value: 'bye' }));

  // Now radios should have been updated
  const allRadios = getAllByTestId('pbl-radio-input');
  expect(allRadios).toHaveLength(3);
  expect(allRadios[0]).not.toBeChecked();
  expect(allRadios[1]).not.toBeChecked();
  expect(allRadios[2]).toBeChecked();
});

test('Render with size "medium"', () => {
  const { getAllByTestId } = renderComponent({ size: 'medium' });
  const allRadios = getAllByTestId('pbl-radio-handle');
  expect(allRadios).toHaveLength(3);
  expect(allRadios[0]).toHaveStyleRule('width', '12px');
  expect(allRadios[1]).toHaveStyleRule('width', '12px');
  expect(allRadios[2]).toHaveStyleRule('width', '12px');
});

test('Render with size "small"', () => {
  const { getAllByTestId } = renderComponent({ size: 'small' });
  const allRadios = getAllByTestId('pbl-radio-handle');
  expect(allRadios).toHaveLength(3);
  expect(allRadios[0]).toHaveStyleRule('width', '8px');
  expect(allRadios[1]).toHaveStyleRule('width', '8px');
  expect(allRadios[2]).toHaveStyleRule('width', '8px');
});

function renderComponent(props) {
  return render(getRenderHtml(props));
}

function getRenderHtml(props) {
  return (
    <PabloThemeProvider>
      <RadioGroup onChange={onChangeMock} {...props}>
        <Radio id="custom-id-1" label="Hello" value="hello" />
        <Radio id="custom-id-2" label="World" value="world" />
        <Radio id="custom-id-3" label="Bye" value="bye" />
      </RadioGroup>
    </PabloThemeProvider>
  );
}
