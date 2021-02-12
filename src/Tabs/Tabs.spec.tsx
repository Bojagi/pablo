import { render, cleanup, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { defaultTheme, PabloThemeProvider } from '../theme';
import { Tabs } from './Tabs';
import { Tab } from './Tab';

let onSelectMock;

beforeEach(() => {
  onSelectMock = jest.fn();
});

afterEach(cleanup);

test('Work with one tab', () => {
  const { container } = render(
    <PabloThemeProvider>
      <Tabs selected="hello">
        <Tab name="hello">Hello</Tab>
      </Tabs>
    </PabloThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Render first selected', () => {
  const { container, getAllByTestId } = renderComponent({ selected: 'hello' });
  expect(container).toMatchSnapshot();
  const allTabs = getAllByTestId('pbl-tab');
  expect(allTabs).toHaveLength(3);
  expect(allTabs[0]).toHaveTextContent('Hello');
  expect(allTabs[1]).toHaveTextContent('World');
  expect(allTabs[2]).toHaveTextContent('Bye');
  expect(allTabs[0]).toHaveStyleRule('color', defaultTheme.colors.brand.main);
  expect(allTabs[1]).toHaveStyleRule('color', defaultTheme.colors.common.black);
  expect(allTabs[2]).toHaveStyleRule('color', defaultTheme.colors.common.black);
});

test('Use Tab "active" prop when "selected" prop of Tabs is not set', () => {
  const { getAllByTestId } = renderComponent({});
  const allTabs = getAllByTestId('pbl-tab');
  expect(allTabs).toHaveLength(3);
  expect(allTabs[0]).toHaveStyleRule('color', defaultTheme.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', defaultTheme.colors.brand.main);
  expect(allTabs[2]).toHaveStyleRule('color', defaultTheme.colors.common.black);
});

test('Trigger onSelect when clicked on a tab', () => {
  const { getAllByTestId } = renderComponent({ selected: 'hello' });
  const allTabs = getAllByTestId('pbl-tab');

  expect(onSelectMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(allTabs[1]);
  });
  expect(onSelectMock).toHaveBeenCalledTimes(1);
  expect(onSelectMock).toHaveBeenCalledWith('world');
});

test('Update tabs when tabs have been updated', () => {
  const { getAllByTestId, rerender } = renderComponent({ selected: 'bye' });
  const allTabs = getAllByTestId('pbl-tab');

  expect(allTabs[0]).toHaveStyleRule('color', defaultTheme.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', defaultTheme.colors.common.black);
  expect(allTabs[2]).toHaveStyleRule('color', defaultTheme.colors.brand.main);

  rerender(getRenderHtml({ selected: 'world' }));

  expect(allTabs[0]).toHaveStyleRule('color', defaultTheme.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', defaultTheme.colors.brand.main);
  expect(allTabs[2]).toHaveStyleRule('color', defaultTheme.colors.common.black);
});

test('Render tabs with icons', () => {
  const { container, getByTestId } = render(
    <PabloThemeProvider>
      <Tabs selected="second">
        <Tab name="first" icon={<div data-testid="icon1">icon1</div>}>
          First tab
        </Tab>
        <Tab name="second" icon={<div data-testid="icon2">icon2</div>}>
          Second tab
        </Tab>
        <Tab name="third" icon={<div data-testid="icon3">icon3</div>}>
          Third tab
        </Tab>
      </Tabs>
    </PabloThemeProvider>
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId('icon1')).toHaveTextContent('icon1');
  expect(getByTestId('icon2')).toHaveTextContent('icon2');
  expect(getByTestId('icon3')).toHaveTextContent('icon3');
});

test('Trigger onClick on tab', () => {
  const onClickMock = jest.fn();
  const { getByTestId } = render(
    <PabloThemeProvider>
      <Tab name="lonely" onClick={onClickMock}>
        Lone Ranger
      </Tab>
    </PabloThemeProvider>
  );

  expect(onClickMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(getByTestId('pbl-tab'));
  });
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('Render tab without "onClick" prop', () => {
  // Render without error
  const { getByTestId } = render(
    <PabloThemeProvider>
      <Tab name="lonely-unclickable">Unclickable</Tab>
    </PabloThemeProvider>
  );
  // Trigger click but don't expect something to happen
  act(() => {
    fireEvent.click(getByTestId('pbl-tab'));
  });
});

function renderComponent(props) {
  return render(getRenderHtml(props));
}

function getRenderHtml(props) {
  return (
    <PabloThemeProvider>
      <Tabs onSelect={onSelectMock} {...props}>
        <Tab name="hello">Hello</Tab>
        <Tab name="world" active>
          World
        </Tab>
        <Tab name="bye">Bye</Tab>
      </Tabs>
    </PabloThemeProvider>
  );
}
