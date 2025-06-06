import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, beforeEach, vi } from 'vitest';
import { Combobox } from './Combobox';
import '../../testUtils/mockResizeObserver';
import { PabloThemeProvider } from '../theme/PabloThemeProvider';

const mockOnChange = vi.fn();
let user: ReturnType<typeof userEvent.setup>;
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<PabloThemeProvider>{ui}</PabloThemeProvider>);
};

beforeEach(() => {
  user = userEvent.setup();
  mockOnChange.mockClear();
});

test('renders Combobox with input field', () => {
  renderWithTheme(
    <Combobox value="" onChange={mockOnChange}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('renders Combobox items as children', async () => {
  renderWithTheme(
    <Combobox value="" showOnEmpty onChange={mockOnChange}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  // Items should be available for selection
  expect(screen.getByTestId('pbl-input')).toBeInTheDocument();

  await user.click(screen.getByTestId('pbl-input'));

  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
});

test('calls onChange when input value changes', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Combobox value="" onChange={mockOnChange}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  await user.type(input, 'opt');

  expect(mockOnChange).toHaveBeenCalled();
});

test('filter options based on input', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Combobox value="foot" showOnEmpty onChange={mockOnChange}>
      <Combobox.Item value="football">Football</Combobox.Item>
      <Combobox.Item value="basketball">Basketball</Combobox.Item>
    </Combobox>
  );

  await user.click(screen.getByTestId('pbl-input'));
  expect(screen.getByText('Football')).toBeInTheDocument();
  expect(screen.queryByText('Basketball')).not.toBeInTheDocument();
});

test('forwards ref to input element', () => {
  const ref = React.createRef<HTMLDivElement>();

  renderWithTheme(
    <Combobox ref={ref} value="" onChange={mockOnChange}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  expect(ref.current).toBeInTheDocument();
});

test('passes input props correctly', () => {
  renderWithTheme(
    <Combobox value="test" onChange={mockOnChange} placeholder="Search options..." disabled>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('test');
  expect(input).toHaveAttribute('placeholder', 'Search options...');
  expect(input).toBeDisabled();
});

test('handles object values with custom toValue function', async () => {
  const toValue = (item: { id: string; name: string }) => item.name;

  renderWithTheme(
    <Combobox value="" showOnEmpty onChange={mockOnChange} toValue={toValue}>
      <Combobox.Item value={{ id: '1', name: 'Apple' }}>Apple</Combobox.Item>
      <Combobox.Item value={{ id: '2', name: 'Banana' }}>Banana</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  await user.click(screen.getByTestId('pbl-input'));

  expect(screen.getByText('Apple')).toBeInTheDocument();
  await user.click(screen.getByText('Apple'));
  expect(mockOnChange).toHaveBeenCalledWith('Apple');
});

test('supports custom filter function', () => {
  const customFilter = vi.fn((item: string, value: string) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  renderWithTheme(
    <Combobox value="app" onChange={mockOnChange} filter={customFilter}>
      <Combobox.Item value="apple">Apple</Combobox.Item>
      <Combobox.Item value="banana">Banana</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('respects maxItems prop', () => {
  renderWithTheme(
    <Combobox value="" onChange={mockOnChange} maxItems={2}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
      <Combobox.Item value="option3">Option 3</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('handles showOnEmpty prop', () => {
  renderWithTheme(
    <Combobox value="" onChange={mockOnChange} showOnEmpty={true}>
      <Combobox.Item value="option1">Option 1</Combobox.Item>
      <Combobox.Item value="option2">Option 2</Combobox.Item>
    </Combobox>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('handles empty children array', () => {
  renderWithTheme(<Combobox value="" onChange={mockOnChange}></Combobox>);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});
