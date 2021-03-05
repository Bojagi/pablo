import {
  render,
  getByTestId as globalGetByTestId,
  queryByTestId as globalQueryByTestId,
  getAllByTestId as globalGetAllByTestId,
  act,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import '../../testUtils/mockResizeObserver';
import { Tooltip } from './Tooltip';

beforeEach(() => {
  jest.useFakeTimers();
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
  ['top', 'translateY(25%)'],
  ['right', 'translateX(-12.5%)'],
  ['bottom', 'translateY(-25%)'],
  ['left', 'translateX(12.5%)'],
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

    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(0);
    });

    await act(() => Promise.resolve());

    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '1');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      'translateY(0) translateX(0)'
    );

    act(() => {
      fireEvent.mouseLeave(getByTestId('pbl-tooltip-wrapper'));
      // wait for the tick to finish
      jest.advanceTimersByTime(0);
    });

    await act(() => Promise.resolve());

    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '0');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      expectedHiddenTransform
    );
  });

  test('show tooltip on hover with delay', async () => {
    const { getByTestId, queryByTestId } = renderComponent({
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

    expect(queryByTestId('pbl-animation-inner')).not.toBeInTheDocument();

    // Do mouse enter and trigger 99ms, should not make tooltip visible
    act(() => {
      fireEvent.mouseEnter(getByTestId('pbl-tooltip-wrapper'));
      jest.advanceTimersByTime(99);
    });

    await act(() => Promise.resolve());

    expect(queryByTestId('pbl-animation-inner')).not.toBeInTheDocument();

    // Wait remaining 1ms should make it visible
    act(() => {
      jest.advanceTimersByTime(1);
    });

    await act(() => Promise.resolve());

    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule('opacity', '1');
    expect(getByTestId('pbl-animation-inner')).toHaveStyleRule(
      'transform',
      'translateY(0) translateX(0)'
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
    queryByTestId: globalQueryByTestId.bind(null, baseElement),
    unmount,
    container: baseElement,
  };
}
