import {
  render,
  getByTestId as globalGetByTestId,
  getAllByTestId as globalGetAllByTestId,
  act,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Tooltip } from './Tooltip';

beforeEach(() => {
  jest.useFakeTimers();
});

Object.defineProperties(window.HTMLElement.prototype, {
  offsetHeight: {
    get() {
      return parseFloat(this.getAttribute('fake-height')) || 0;
    },
  },
  offsetWidth: {
    get() {
      return parseFloat(this.getAttribute('fake-width')) || 0;
    },
  },
});

test('Do not show tooltip if there is no content prop', async () => {
  const { container } = renderComponent({
    content: undefined,
  });
  // This is because of passing ref on effect, which happens on next tick
  await act(() => Promise.resolve());

  expect(container).toHaveTextContent(/^content$/);
  expect(container).toMatchSnapshot();
});

describe.each([
  ['top', 'bottom', 'translateY(25%)', 'translateY(0)'],
  ['right', 'left', 'translateX(25%)', 'translateX(0)'],
  ['bottom', 'top', 'translateY(-25%)', 'translateY(0)'],
  ['left', 'right', 'translateX(-25%)', 'translateX(0)'],
])('side "%s"', (side, oppositeSite, expectedHiddenTransform, expectedVisibleTransform) => {
  test('render and update size', async () => {
    const { container, getByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      side,
    });
    // This is because of passing ref on effect, which happens on next tick
    await act(() => Promise.resolve());

    expect(container).toMatchSnapshot();
    // JSDOM can't calculate offsetHeight/offsetWidth, so it's always 0 (we can't test resize the update to happen)
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(oppositeSite, '4px');

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(oppositeSite, '4px');
  });

  test('show tooltip on hover', async () => {
    const { getByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      side,
    });
    // This is because of passing ref on effect, which happens on next tick
    await act(() => Promise.resolve());

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );

    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(0);
    });

    await act(() => Promise.resolve());

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '1');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedVisibleTransform
    );

    act(() => {
      fireEvent.mouseLeave(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(0);
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );
  });

  test('show tooltip on hover with delay', async () => {
    const { getByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      delay: 100,
      side,
    });
    // This is because of passing ref on effect, which happens on next tick
    await act(() => Promise.resolve());

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );

    // Do mouse enter and trigger 99ms, should not make tooltip visible
    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      jest.advanceTimersByTime(99);
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );

    // Wait remaining 1ms should make it visible
    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '1');
    expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
      'transform',
      expectedVisibleTransform
    );
  });
});

function renderComponent(props) {
  const { baseElement, unmount } = render(
    <PabloThemeProvider>
      <Tooltip {...props}>
        <div data-testid="pbl-tooltip-wrapper">content</div>
      </Tooltip>
    </PabloThemeProvider>
  );

  return {
    getByTestId: globalGetByTestId.bind(null, baseElement),
    getAllByTestId: globalGetAllByTestId.bind(null, baseElement),
    unmount,
    container: baseElement,
  };
}
