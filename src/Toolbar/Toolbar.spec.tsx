import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { defaultTheme, PabloThemeProvider } from '../theme';
import { Toolbar } from './Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarItem } from './ToolbarItem';

test('Render toolbar', () => {
  const { container } = renderComponent({}, {});
  expect(container).toMatchSnapshot();
});

test('Render toolbar with one item active', () => {
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
  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[1]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[2]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[3]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[4]).toHaveStyleRule('background-color', 'transparent');
});

test('Render toolbar with all items active', () => {
  const { getAllByTestId } = renderComponent({}, { active: true });
  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[1]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[2]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[3]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[4]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
});

test('Render toolbar items selected by "selected" Toolbar prop', () => {
  const { getAllByTestId } = renderComponent({ selected: 'italic' }, { active: true });
  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[1]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[2]).toHaveStyleRule('background-color', defaultTheme.colors.brand.main);
  expect(allButtons[3]).toHaveStyleRule('background-color', 'transparent');
  expect(allButtons[4]).toHaveStyleRule('background-color', 'transparent');
});

test('Render toolbar items with proper hover colors', () => {
  const { getAllByTestId } = renderComponent({ selected: 'italic' }, {});
  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':hover',
  });
  expect(allButtons[1]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':hover',
  });
  // Active ones do not have a hover state, we can't test properly for it
  expect(allButtons[3]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':hover',
  });
  expect(allButtons[4]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':hover',
  });
});

test('Render toolbar items with proper focus colors', () => {
  const { getAllByTestId } = renderComponent({ selected: 'italic' }, {});
  const allButtons = getAllByTestId('pbl-toolbar-item-button');
  expect(allButtons).toBeArrayOfSize(5);
  expect(allButtons[0]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':focus',
  });
  expect(allButtons[1]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':focus',
  });
  // Active ones do not have a focus state, we can't test properly for it
  expect(allButtons[3]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':focus',
  });
  expect(allButtons[4]).toHaveStyleRule('background-color', defaultTheme.colors.brand.light, {
    modifier: ':focus',
  });
});

test('Trigger onClick on all items and call function with item name as argument', () => {
  const onClickMock = jest.fn();
  const { getAllByTestId } = renderComponent({}, { onClick: onClickMock });
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

test('Render toolbar items with tooltip', () => {
  const { getAllByTestId } = renderComponent({}, { tooltip: 'i am a tooltip' });
  const allTooltop = getAllByTestId('pbl-tooltip-popover');
  expect(allTooltop).toBeArrayOfSize(5);
  expect(allTooltop[0]).toHaveTextContent('i am a tooltip');
  expect(allTooltop[1]).toHaveTextContent('i am a tooltip');
  expect(allTooltop[2]).toHaveTextContent('i am a tooltip');
  expect(allTooltop[3]).toHaveTextContent('i am a tooltip');
  expect(allTooltop[4]).toHaveTextContent('i am a tooltip');
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
      </Toolbar>
    </PabloThemeProvider>
  );
}
