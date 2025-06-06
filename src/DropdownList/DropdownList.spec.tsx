import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, beforeEach, vi } from 'vitest';
import { DropdownList } from './DropdownList';
import { Input } from '../Input';
import { PabloThemeProvider } from '../theme/PabloThemeProvider';
import '../../testUtils/mockResizeObserver';

const mockOnChange = vi.fn();
const mockOnOpen = vi.fn();
const mockOnClose = vi.fn();
const mockOnOpenStateChange = vi.fn();
const mockScrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<PabloThemeProvider>{ui}</PabloThemeProvider>);
};

const mockItems = [
  {
    value: 'apple',
    key: 'apple',
    label: 'Apple',
    toOutput: (value: string) => value,
    toString: (value: string) => value,
  },
  {
    value: 'banana',
    key: 'banana',
    label: 'Banana',
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
  mockOnOpen.mockClear();
  mockOnClose.mockClear();
  mockOnOpenStateChange.mockClear();
  mockScrollIntoView.mockClear();
});

test('renders DropdownList with child element', () => {
  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange}>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('opens dropdown when child element is clicked', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.getByText('Cherry')).toBeInTheDocument();
});

test('calls onChange when item is selected', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  const appleItem = screen.getByText('Apple');
  await user.click(appleItem);

  expect(mockOnChange).toHaveBeenCalledWith('apple');
});

test('filters items based on filterTerm', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      filterTerm="app"
      itemFilter={(value, term) => value.toLowerCase().includes(term.toLowerCase())}
    >
      <Input value="app" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
});

test('respects maxItems prop', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty maxItems={2}>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
});

test('calls onOpen and onClose callbacks', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      onOpen={mockOnOpen}
      onClose={mockOnClose}
    >
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');

  // Open dropdown
  await user.click(input);
  expect(mockOnOpen).toHaveBeenCalled();
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  // Close dropdown by clicking outside
  await user.click(document.body);
  expect(mockOnClose).toHaveBeenCalled();
});

test('calls onOpenStateChange callback', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      onOpenStateChange={mockOnOpenStateChange}
    >
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');

  await user.click(input);
  expect(mockOnOpenStateChange).toHaveBeenCalledWith(true);

  await user.click(document.body);
  expect(mockOnOpenStateChange).toHaveBeenCalledWith(false);
});

test('does not close on select when closeOnSelect is false', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty closeOnSelect={false}>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  const appleItem = screen.getByText('Apple');
  await user.click(appleItem);

  expect(mockOnChange).toHaveBeenCalledWith('apple');
  expect(screen.getByText('Apple')).toBeInTheDocument(); // Still visible
});

test('uses custom toOutput function', async () => {
  const user = userEvent.setup();
  const customToOutput = (value: string) => value.toUpperCase();

  const itemsWithCustomOutput = mockItems.map((item) => ({
    ...item,
    toOutput: customToOutput,
  }));

  renderWithTheme(
    <DropdownList
      items={itemsWithCustomOutput}
      onChange={mockOnChange}
      showOnEmpty
      toOutput={customToOutput}
    >
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  const appleItem = screen.getByText('Apple');
  await user.click(appleItem);

  expect(mockOnChange).toHaveBeenCalledWith('APPLE');
});

test('handles keyboard navigation', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  // Test arrow down navigation
  expect(mockScrollIntoView).not.toHaveBeenCalled();
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(mockScrollIntoView).toHaveBeenCalledTimes(4);
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(mockOnChange).toHaveBeenCalledWith('banana');
});

test('uses custom renderItem function', async () => {
  const user = userEvent.setup();
  const customRenderItem = vi.fn((item) => `Custom: ${item.label}`);

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      renderItem={customRenderItem}
    >
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(customRenderItem).toHaveBeenCalled();
  expect(screen.getByText('Custom: Apple')).toBeInTheDocument();
});

test('handles custom itemFilter function', async () => {
  const user = userEvent.setup();
  const customFilter = vi.fn((value: string, filterTerm: string) => value.endsWith('a'));

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      filterTerm="test"
      itemFilter={customFilter}
    >
      <Input value="test" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(customFilter).toHaveBeenCalled();
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.queryByText('Apple')).not.toBeInTheDocument();
});

test('handles empty items array', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={[]} onChange={mockOnChange} showOnEmpty>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.queryByText('Apple')).not.toBeInTheDocument();
});

test('shows dropdown based on showOnEmpty and filterTerm', async () => {
  const user = userEvent.setup();

  // Test without showOnEmpty and empty filterTerm
  const { rerender } = renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} filterTerm="">
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  let input = screen.getByRole('textbox');
  await user.click(input);
  expect(screen.queryByText('Apple')).not.toBeInTheDocument();

  // Test with filterTerm
  rerender(
    <PabloThemeProvider>
      <DropdownList items={mockItems} onChange={mockOnChange} filterTerm="a">
        <Input value="a" onChange={mockOnChange} />
      </DropdownList>
    </PabloThemeProvider>
  );

  input = screen.getByRole('textbox');
  await user.click(input);
  expect(screen.getByText('Apple')).toBeInTheDocument();
});

test('handles wrapItems prop', async () => {
  const user = userEvent.setup();

  renderWithTheme(
    <DropdownList items={mockItems} onChange={mockOnChange} showOnEmpty wrapItems={false}>
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();
});

test('uses custom anchorElement', async () => {
  const user = userEvent.setup();
  const anchorElement = document.createElement('div');
  document.body.appendChild(anchorElement);

  renderWithTheme(
    <DropdownList
      items={mockItems}
      onChange={mockOnChange}
      showOnEmpty
      anchorElement={anchorElement}
    >
      <Input value="" onChange={mockOnChange} />
    </DropdownList>
  );

  const input = screen.getByRole('textbox');
  await user.click(input);

  expect(screen.getByText('Apple')).toBeInTheDocument();

  // Cleanup
  document.body.removeChild(anchorElement);
});
