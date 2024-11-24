import {
  render,
  getByTestId as globalGetByTestId,
  queryByTestId as globalQueryByTestId,
  getAllByTestId as globalGetAllByTestId,
  act,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import '../../testUtils/mockResizeObserver';
import { Tooltip } from './Tooltip';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
});

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb(123) as any);
});

afterEach(() => {
  (window.requestAnimationFrame as any).mockRestore();
});

afterEach(cleanup);

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
  ['top', 'translateY(-25%)'],
  ['right', 'translateX(12.5%)'],
  ['bottom', 'translateY(25%)'],
  ['left', 'translateX(-12.5%)'],
])('side "%s"', (side, expectedHiddenTransform) => {
  test('render and update size', async () => {
    const { container, getByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      side,
    });
    // This is because of passing ref on effect, which happens on next tick
    await act(() => Promise.resolve());

    expect(container).toMatchSnapshot();

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });
  });

  test('show tooltip on hover', async () => {
    const { getByTestId, queryByTestId } = renderComponent({
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

    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
    });

    await waitFor(() => {
      expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '1');
      expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
        'transform',
        'translateY(0) translateX(0)'
      );
    });

    act(() => {
      fireEvent.mouseLeave(getByTestId('pbl-tooltip-wrapper'));
    });

    await act(() => new Promise((resolve) => requestAnimationFrame(resolve as any)));

    expect(queryByTestId('pbl-tooltip-popover')).not.toBeNull();
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );

    // At the end the popover content should be removed
    await waitFor(() => {
      expect(queryByTestId('pbl-tooltip-popover')).toBeNull();
    });
  });

  test('Do not show tooltip on hover when disabled', async () => {
    const { getByTestId, queryByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      side,
      disabled: true,
    });
    // This is because of passing ref on effect, which happens on next tick
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve as any)));

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });

    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(0);
    });

    await act(() => Promise.resolve());

    expect(queryByTestId('pbl-tooltip-popover')).toBeNull();
  });

  test('Hide tooltip if button is disabled after click', async () => {
    const { getByTestId, queryByTestId, rerender } = renderComponent({
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

    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(queryByTestId('pbl-tooltip-popover')).not.toBeNull();
    });

    rerender({
      content: `This is a tooltip on the ${side} side`,
      side,
      disabled: true,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('pbl-tooltip-popover')).toBeNull();

    // Take the tooltip back in
    rerender({
      content: `This is a tooltip on the ${side} side`,
      side,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('pbl-tooltip-popover')).toBeNull();
  });

  test('Show tooltip on click', async () => {
    const { getByTestId, queryByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      side,
      showOnClick: true,
    });

    // This is because of passing ref on effect, which happens on next tick
    await act(() => Promise.resolve());

    // Trigger resize update and update the size
    act(() => {
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
      getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
      fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
    });

    act(() => {
      fireEvent.click(getByTestId('pbl-tooltip-wrapper'));
    });

    await waitFor(() => {
      expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '1');
      expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
        'transform',
        'translateY(0) translateX(0)'
      );
    });

    act(() => {
      fireEvent.click(getByTestId('pbl-tooltip-wrapper'));
    });

    await act(() => new Promise((resolve) => requestAnimationFrame(resolve as any)));

    expect(queryByTestId('pbl-tooltip-popover')).not.toBeNull();
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );

    // At the end the popover content should be removed
    await waitFor(() => {
      expect(queryByTestId('pbl-tooltip-popover')).toBeNull();
    });
  });

  test('show tooltip on hover with delay', async () => {
    const { getByTestId, queryByTestId } = renderComponent({
      content: `This is a tooltip on the ${side} side`,
      delay: 100,
      animationDuration: 10,
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

    expect(queryByTestId('pbl-animation-inner')).not.toBeInTheDocument();

    // Do mouse enter and trigger 99ms, should not make tooltip visible
    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
    });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

    expect(queryByTestId('pbl-animation-inner')).not.toBeInTheDocument();

    // Waiting 1ms less should still not make it visible
    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(queryByTestId('pbl-animation-inner')).not.toBeInTheDocument();

    // Wait remaining 1ms should make it visible
    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '1');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      'translateY(0) translateX(0)'
    );
  });
});

function renderComponent(props) {
  const renderFn = (innerProps) => (
    <PabloThemeProvider>
      <Tooltip animationDuration={10} {...innerProps}>
        <div data-testid="pbl-tooltip-wrapper">content</div>
      </Tooltip>
    </PabloThemeProvider>
  );

  const { baseElement, unmount, rerender } = render(renderFn(props));
  const doReRender = (innerProps) => rerender(renderFn(innerProps));
  return {
    getByTestId: globalGetByTestId.bind(null, baseElement),
    getAllByTestId: globalGetAllByTestId.bind(null, baseElement),
    queryByTestId: globalQueryByTestId.bind(null, baseElement),
    unmount,
    rerender: doReRender,
    container: baseElement,
  };
}
