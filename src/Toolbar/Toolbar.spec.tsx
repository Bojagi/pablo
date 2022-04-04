import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { waitOneTick } from '../../testUtils/waitOneTick';
import { PabloThemeProvider } from '../theme';
import { Toolbar } from './Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarItem } from './ToolbarItem';
import '../../testUtils/mockResizeObserver';
import { themeVars } from '../theme/themeVars';

beforeEach(() => {
  jest.useFakeTimers();
});

test('Render toolbar', () => {
  const { container } = renderComponent({}, {});
  expect(container).toMatchSnapshot();
});

test('Render toolbar with one item active', async () => {
  const { getAllByTestId } = render(
    <PabloThemeProvider>
      <Toolbar>
        <ToolbarItem name="bold" icon={<div>bold-icon</div>} />
        <ToolbarItem name="underline" active icon={<div>underline-icon</div>} />
        <ToolbarItem name="italic" icon={<div>italic-icon</div>} />
        <ToolbarDivider />
        <ToolbarItem name="edit" icon={<div>edit-icon</div>} />
        <ToolbarItem name="crop" icon={<div>crop-icon</div>} />
      </Toolbar>
    </PabloThemeProvider>
  );
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[1]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[2]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[3]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[4]).toHaveStyleRule('background-color', 'transparent');
});

test('Render toolbar with all items active', async () => {
  const { getAllByTestId } = renderComponent({}, { active: true });
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(6);
  expect(allButtons[0]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[1]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[2]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[3]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[4]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[5]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
});

test('Render toolbar with disabled button disabled', async () => {
  const { getAllByTestId } = renderComponent({}, {});
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons[0]).not.toHaveAttribute('disabled');
  expect(allButtons[1]).not.toHaveAttribute('disabled');
  expect(allButtons[2]).not.toHaveAttribute('disabled');
  expect(allButtons[3]).not.toHaveAttribute('disabled');
  expect(allButtons[4]).not.toHaveAttribute('disabled');
  expect(allButtons[5]).toHaveAttribute('disabled');
});

test('Render toolbar items selected by "selected" Toolbar prop', async () => {
  const { getAllByTestId } = renderComponent({ selected: 'italic' }, { active: true });
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(6);
  expect(allButtons[0]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[1]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[2]).toHaveStyleRule('background-color', themeVars.colors.brand.main);
  expect(allButtons[3]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[4]).toHaveStyleRule('background-color', 'transparent');
});

test('Trigger onClick on all items and call function with item name as argument', async () => {
  const onClickMock = jest.fn();
  const { getAllByTestId } = renderComponent({}, { onClick: onClickMock });
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(onClickMock).toHaveBeenCalledTimes(0);

  // Click "bold" item
  fireEvent.click(allButtons[0]);
  expect(onClickMock).toHaveBeenCalledTimes(1);
  expect(onClickMock).toHaveBeenCalledWith('bold');

  // Click "underline" item
  fireEvent.click(allButtons[1]);
  expect(onClickMock).toHaveBeenCalledTimes(2);
  expect(onClickMock).toHaveBeenCalledWith('underline');

  // Click "italic" item
  fireEvent.click(allButtons[2]);
  expect(onClickMock).toHaveBeenCalledTimes(3);
  expect(onClickMock).toHaveBeenCalledWith('italic');

  // Click "edit" item
  fireEvent.click(allButtons[3]);
  expect(onClickMock).toHaveBeenCalledTimes(4);
  expect(onClickMock).toHaveBeenCalledWith('edit');

  // Click "crop" item
  fireEvent.click(allButtons[4]);
  expect(onClickMock).toHaveBeenCalledTimes(5);
  expect(onClickMock).toHaveBeenCalledWith('crop');
});

test('Render toolbar items with tooltip', async () => {
  const { getAllByTestId } = renderComponent({}, { tooltip: 'i am a tooltip' });
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  const allButtons = getAllByTestId('pbl-toolbar-item-button');

  act(() => {
    allButtons.forEach((btn) => {
      fireEvent.mouseEnter(btn);
    });
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  await waitOneTick(0, true);

  const allTooltips = getAllByTestId('pbl-tooltip-popover');
  expect(allTooltips).toBeArrayOfSize(5);
  expect(allTooltips[0]).toHaveTextContent('i am a tooltip');
  expect(allTooltips[1]).toHaveTextContent('i am a tooltip');
  expect(allTooltips[2]).toHaveTextContent('i am a tooltip');
  expect(allTooltips[3]).toHaveTextContent('i am a tooltip');
  expect(allTooltips[4]).toHaveTextContent('i am a tooltip');
});

function renderComponent(toolbarProps, toolbarItemProps) {
  return render(
    <PabloThemeProvider>
      <Toolbar {...toolbarProps}>
        <ToolbarItem name="bold" {...toolbarItemProps} icon={<div>bold-icon</div>} />
        <ToolbarItem name="underline" {...toolbarItemProps} icon={<div>underline-icon</div>} />
        <ToolbarItem name="italic" {...toolbarItemProps} icon={<div>italic-icon</div>} />
        <ToolbarDivider />
        <ToolbarItem name="edit" {...toolbarItemProps} icon={<div>edit-icon</div>} />
        <ToolbarItem name="crop" {...toolbarItemProps} icon={<div>crop-icon</div>} />
        <ToolbarItem
          name="disabled"
          disabled
          {...toolbarItemProps}
          icon={<div>disabled-icon</div>}
        />
      </Toolbar>
    </PabloThemeProvider>
  );
}
