import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Tabs } from './Tabs';
import { Tab } from './Tab';
import {
  resizeObserverCallbacks,
  cleanupResizeObserver,
  resizeObserverElements,
} from '../../testUtils/mockResizeObserver';
import { setFakeWidth } from '../../testUtils/setFakeDimensions';
import { waitOneTick } from '../../testUtils/waitOneTick';
import { themeVars } from '../theme/themeVars';

let onSelectMock;

beforeEach(() => {
  onSelectMock = vi.fn();
});

//afterEach(cleanup);
afterEach(cleanupResizeObserver);

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
  // 3 + 3 shadowed + "more" tab
  expect(allTabs).toHaveLength(7);
  expect(allTabs[0]).toHaveTextContent('Hello');
  expect(allTabs[1]).toHaveTextContent('World');
  expect(allTabs[2]).toHaveTextContent('Bye');
  expect(allTabs[0]).toHaveStyleRule('color', themeVars.colors.brand.main);
  expect(allTabs[1]).toHaveStyleRule('color', themeVars.colors.common.black);
  expect(allTabs[2]).toHaveStyleRule('color', themeVars.colors.common.black);
});

test('Use Tab "active" prop when "selected" prop of Tabs is not set', () => {
  const { getAllByTestId } = renderComponent({});
  const allTabs = getAllByTestId('pbl-tab');
  // 3 + 3 shadowed + "more" tab
  expect(allTabs).toHaveLength(7);
  expect(allTabs[0]).toHaveStyleRule('color', themeVars.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', themeVars.colors.brand.main);
  expect(allTabs[2]).toHaveStyleRule('color', themeVars.colors.common.black);
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

  expect(allTabs[0]).toHaveStyleRule('color', themeVars.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', themeVars.colors.common.black);
  expect(allTabs[2]).toHaveStyleRule('color', themeVars.colors.brand.main);

  rerender(getRenderHtml({ selected: 'world' }));

  expect(allTabs[0]).toHaveStyleRule('color', themeVars.colors.common.black);
  expect(allTabs[1]).toHaveStyleRule('color', themeVars.colors.brand.main);
  expect(allTabs[2]).toHaveStyleRule('color', themeVars.colors.common.black);
});

test('Show "more" tab when there are too many tabs to fit the content', async () => {
  const { container, getByTestId, getAllByTestId, baseElement } = render(
    <PabloThemeProvider>
      <Tabs selected="hello">
        <Tab name="hello">Hello</Tab>
        <Tab name="world">World</Tab>
        <Tab name="hi">Hi</Tab>
        <Tab name="earth">Earth</Tab>
      </Tabs>
    </PabloThemeProvider>
  );
  act(() => {
    setFakeWidth(getByTestId('pbl-tabs'), 100);
    getAllByTestId('pbl-tab').forEach((item) => {
      setFakeWidth(item, 50);
    });
    resizeObserverCallbacks[0]([resizeObserverElements[0]]);
  });

  expect(container).toMatchSnapshot();
  const allTabs = getAllByTestId('pbl-tab');
  // 1 + 4 shadowed + "more" tab
  expect(allTabs).toHaveLength(6);

  await act(() => {
    fireEvent.click(allTabs[1]);
    return Promise.resolve();
  });

  await waitOneTick();

  const allMenuItems = baseElement.querySelectorAll('[data-testid="pbl-menu-item"]');
  expect(allMenuItems).toHaveLength(3);
  expect(allMenuItems[0]).toHaveTextContent('World');
  expect(allMenuItems[1]).toHaveTextContent('Hi');
  expect(allMenuItems[2]).toHaveTextContent('Earth');
});

test('Select "more" tab', async () => {
  const { getByTestId, getAllByTestId, baseElement } = render(
    <PabloThemeProvider>
      <Tabs selected="earth" onSelect={onSelectMock}>
        <Tab name="hello">Hello</Tab>
        <Tab name="world">World</Tab>
        <Tab name="hi">Hi</Tab>
        <Tab name="earth">Earth</Tab>
      </Tabs>
    </PabloThemeProvider>
  );

  await act(async () => {
    setFakeWidth(getByTestId('pbl-tabs'), 100);
    getAllByTestId('pbl-tab').forEach((item) => {
      setFakeWidth(item, 50);
    });
    resizeObserverCallbacks[0]([resizeObserverElements[0]]);
  });

  await waitOneTick();

  await act(async () => {
    const allTabs = getAllByTestId('pbl-tab');
    expect(allTabs).toHaveLength(6);
    fireEvent.click(allTabs[1]);
    await Promise.resolve();
  });

  await waitOneTick();

  expect(onSelectMock).toHaveBeenCalledTimes(0);

  await act(async () => {
    const allMenuItems = baseElement.querySelectorAll('[data-testid="pbl-menu-item"]');
    fireEvent.click(allMenuItems[1], {
      bubbles: true,
    });
  });

  await waitOneTick();

  expect(onSelectMock).toHaveBeenCalledTimes(1);
  expect(onSelectMock).toHaveBeenCalledWith('hi');
});

test('Select "more" tab with custom click handler', async () => {
  const onClickMock = vi.fn();
  const { getByTestId, getAllByTestId, baseElement } = render(
    <PabloThemeProvider>
      <Tabs selected="earth">
        <Tab name="hello">Hello</Tab>
        <Tab name="world">World</Tab>
        <Tab name="hi" onClick={onClickMock}>
          Hi
        </Tab>
        <Tab name="earth">Earth</Tab>
      </Tabs>
    </PabloThemeProvider>
  );

  await act(async () => {
    setFakeWidth(getByTestId('pbl-tabs'), 100);
    getAllByTestId('pbl-tab').forEach((item) => {
      setFakeWidth(item, 50);
    });
    resizeObserverCallbacks[0]([resizeObserverElements[0]]);
  });

  await waitOneTick();

  await act(async () => {
    const allTabs = getAllByTestId('pbl-tab');
    expect(allTabs).toHaveLength(6);
    fireEvent.click(allTabs[1]);
    await Promise.resolve();
  });

  await waitOneTick();

  expect(onClickMock).toHaveBeenCalledTimes(0);

  await act(async () => {
    const allMenuItems = baseElement.querySelectorAll('[data-testid="pbl-menu-item"]');
    fireEvent.click(allMenuItems[1], {
      bubbles: true,
    });
  });

  await waitOneTick();

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('Close "more" menu when clicking outside', async () => {
  const { getByTestId, getAllByTestId, baseElement } = render(
    <PabloThemeProvider>
      <div data-testid="outside-elem"></div>
      <Tabs selected="earth">
        <Tab name="hello">Hello</Tab>
        <Tab name="world">World</Tab>
        <Tab name="hi">Hi</Tab>
        <Tab name="earth">Earth</Tab>
      </Tabs>
    </PabloThemeProvider>
  );

  await act(async () => {
    setFakeWidth(getByTestId('pbl-tabs'), 100);
    getAllByTestId('pbl-tab').forEach((item) => {
      setFakeWidth(item, 50);
    });
    resizeObserverCallbacks[0]([resizeObserverElements[0]]);
  });

  await waitOneTick();

  await act(async () => {
    const allTabs = getAllByTestId('pbl-tab');
    expect(allTabs).toHaveLength(6);
    fireEvent.click(allTabs[1]);
    await Promise.resolve();
  });

  await waitOneTick();

  expect(baseElement.querySelectorAll('[data-testid="pbl-menu-item"]')).toHaveLength(3);

  await act(async () => {
    await waitOneTick();
    fireEvent.click(getByTestId('outside-elem'));
  });

  await waitOneTick();

  expect(baseElement.querySelectorAll('[data-testid="pbl-menu-item"]')).toHaveLength(0);
});

test('Render tabs with icons', () => {
  const { container, getAllByTestId } = render(
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
  expect(getAllByTestId('icon1')[0]).toHaveTextContent('icon1');
  expect(getAllByTestId('icon2')[0]).toHaveTextContent('icon2');
  expect(getAllByTestId('icon3')[0]).toHaveTextContent('icon3');
});

test('Trigger onClick on tab', () => {
  const onClickMock = vi.fn();
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
        <Tab name="world" selected>
          World
        </Tab>
        <Tab name="bye">Bye</Tab>
      </Tabs>
    </PabloThemeProvider>
  );
}
