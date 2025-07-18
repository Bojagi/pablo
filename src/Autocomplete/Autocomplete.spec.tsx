import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, beforeEach, vi } from 'vitest';
import { Autocomplete } from './Autocomplete';
import { Input } from '../Input';
import { PabloThemeProvider } from '../theme/PabloThemeProvider';
import '../../testUtils/mockResizeObserver';

const mockOnChange = vi.fn();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<PabloThemeProvider>{ui}</PabloThemeProvider>);
};

const mockItems = [
  {
    value: 'apple',
    label: 'Apple',
    key: 'apple',
    toOutput: (value: string) => value,
    toString: (value: string) => value,
  },
  {
    value: 'banana',
    label: 'Banana',
    key: 'banana',
    toOutput: (value: string) => value,
    toString: (value: string) => value,
  },
  {
    value: 'cherry',
    key: 'cherry',
    label: 'Cherry',
    toOutput: (value: string) => value,
    toString: (value: string) => value,
  },
];

beforeEach(() => {
  mockOnChange.mockClear();
});

test('renders Autocomplete with input child', () => {
  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange}>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('shows items when showOnEmpty is true', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.getByText('Cherry')).toBeInTheDocument();
});

test('filters items based on filterTerm', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange} showOnEmpty filterTerm="app">
      <Input value="app" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
});

test('calls onChange when item is selected', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  const appleItem = screen.getByText('Apple');
  await user.click(appleItem);

  expect(mockOnChange).toHaveBeenCalledWith('apple');
});

test('respects maxItems prop', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange} showOnEmpty maxItems={2}>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
});

test('uses custom itemFilter when provided', async () => {
  const user = userEvent.setup();
  const customFilter = vi.fn((value: string) => value.endsWith('a'));

  renderWithTheme(
    <Autocomplete
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      filterTerm="test"
      itemFilter={customFilter}
    >
      <Input value="test" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(customFilter).toHaveBeenCalled();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
});

test('uses custom toOutput function', async () => {
  const user = userEvent.setup();
  const customToOutput = vi.fn((value: string) => value.toUpperCase());

  const itemsWithCustomOutput = mockItems.map((item) => ({
    ...item,
    toOutput: customToOutput,
  }));

  renderWithTheme(
    <Autocomplete
      items={itemsWithCustomOutput}
      onChange={mockOnChange}
      showOnEmpty
      toOutput={customToOutput}
    >
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  const appleItem = screen.getByText('Apple');
  await user.click(appleItem);

  expect(mockOnChange).toHaveBeenCalledWith('APPLE');
});

test('handles empty items array', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={[]} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.queryByText('Apple')).not.toBeInTheDocument();
});

test('clones children with onBlur handler', () => {
  const originalOnBlur = vi.fn();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange}>
      <Input value="" onChange={mockOnChange} onBlur={originalOnBlur} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  fireEvent.blur(input);
  expect(originalOnBlur).toHaveBeenCalled();
});

test('do not blur input when clicking on autocomplete items', async () => {
  const originalOnBlur = vi.fn();

  renderWithTheme(
    <Autocomplete showOnEmpty items={mockItems} onChange={mockOnChange}>
      <Input value="" onChange={mockOnChange} onBlur={originalOnBlur} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  await userEvent.setup().click(input);
  act(() => {
    input.focus();
  });
  expect(input).toHaveFocus();
  const appleItem = screen.getByText('Apple');
  act(() => {
    appleItem.click();
  });
  expect(originalOnBlur).not.toHaveBeenCalled();
  expect(input).toHaveFocus();
});

test('handles wrapItems prop', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <Autocomplete items={mockItems} onChange={mockOnChange} showOnEmpty wrapItems>
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
});

test('uses custom renderItem function when provided', async () => {
  const user = userEvent.setup();
  const customRenderItem = vi.fn(({ label }) => `Custom: ${label}`);

  renderWithTheme(
    <Autocomplete
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      renderItem={customRenderItem}
    >
      <Input value="" onChange={mockOnChange} />
    </Autocomplete>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(customRenderItem).toHaveBeenCalled();
  expect(screen.getByText('Custom: Apple')).toBeInTheDocument();
  expect(screen.getByText('Custom: Banana')).toBeInTheDocument();
  expect(screen.getByText('Custom: Cherry')).toBeInTheDocument();
});
