import { act, fireEvent, render } from '@testing-library/react';
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

test('Do not show tooltip if there is no content prop', () => {
  const { container } = renderComponent({
    content: undefined,
  });
  expect(container).toHaveTextContent(/^content$/);
  expect(container).toMatchSnapshot();
});

describe.each([
  ['top', 'bottom', 10, 'translateY(25%) translateX(-50%)', 'translateY(0) translateX(-50%)'],
  ['right', 'left', 20, 'translateX(25%) translateY(-50%)', 'translateX(0) translateY(-50%)'],
  ['bottom', 'top', 10, 'translateY(-25%) translateX(-50%)', 'translateY(0) translateX(-50%)'],
  ['left', 'right', 20, 'translateX(-25%) translateY(-50%)', 'translateX(0) translateY(-50%)'],
])(
  'side "%s"',
  (side, oppositeSite, expectedSideSize, expectedHiddenTransform, expectedVisibleTransform) => {
    test('render and update size', () => {
      const { container, getByTestId } = renderComponent({
        content: `This is a tooltip on the ${side} side`,
        side,
      });
      expect(container).toMatchSnapshot();
      // JSDOM can't calculate offsetHeight/offsetWidth, so it's always 0 (we can't test resize the update to happen)
      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(oppositeSite, 'calc(8px + 0px)');

      // Trigger resize update and update the size
      act(() => {
        getByTestId('pbl-tooltip-wrapper').setAttribute('fake-height', '10');
        getByTestId('pbl-tooltip-wrapper').setAttribute('fake-width', '20');
        fireEvent(getByTestId('pbl-tooltip-wrapper'), new Event('resize'));
      });

      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
        oppositeSite,
        `calc(8px + ${expectedSideSize}px)`
      );
    });

    test('show tooltip on hover', () => {
      const { getByTestId } = renderComponent({
        content: `This is a tooltip on the ${side} side`,
        side,
      });

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

      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '1');
      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
        'transform',
        expectedVisibleTransform
      );

      act(() => {
        fireEvent.mouseLeave(getByTestId('pbl-tooltip-wrapper'));
      });

      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule('opacity', '0');
      expect(getByTestId('pbl-tooltip-popover')).toHaveStyleRule(
        'transform',
        expectedHiddenTransform
      );
    });

    test('show tooltip on hover with delay', () => {
      const { getByTestId } = renderComponent({
        content: `This is a tooltip on the ${side} side`,
        delay: 100,
        side,
      });

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
  }
);

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Tooltip {...props}>content</Tooltip>
    </PabloThemeProvider>
  );
}
