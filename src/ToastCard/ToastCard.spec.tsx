import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { ToastCard } from './ToastCard';

test('Render toast card with no type and with only title', () => {
  const { container } = renderComponent({ title: 'Hi' });
  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild?.textContent).toBe('Hi');
});

test('Render toast card with title and description', () => {
  const { getByTestId } = renderComponent({
    title: 'Hi',
    description: 'Something happened!',
  });
  expect(getByTestId('pbl-toastcard-description')).toHaveTextContent('Something happened!');
});

test('Render closable toast card', () => {
  const onCloseMock = jest.fn();
  const { getByTestId } = renderComponent({
    title: 'Hi',
    onClose: onCloseMock,
    description: 'Something happened!',
    closable: true,
  });

  expect(onCloseMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(getByTestId('pbl-toastcard-closebtn'));
  });
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

describe.each([
  [undefined, themeVars.colors.common.white, { icon: <div>hi</div> }],
  ['info', themeVars.colors.common.white, {}],
  ['success', themeVars.colors.positive.main, {}],
  ['warning', themeVars.colors.neutral.main, {}],
  ['error', themeVars.colors.negative.main, {}],
  ['unknown', themeVars.colors.common.white, { icon: <div>hi</div> }],
])('type %s', (type, expectedIconColor, additionalProps) => {
  test('Render toast card with only title', () => {
    const { container, getByTestId } = renderComponent({ type, title: 'Hi', ...additionalProps });
    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('pbl-toastcard-iconbox')).toHaveStyleRule('fill', expectedIconColor);
  });

  test('Render toast card with custom icon', () => {
    const { getByTestId } = renderComponent({ type, title: 'Hi', icon: <div>hello</div> });
    expect(getByTestId('pbl-toastcard-iconbox')).toMatchSnapshot();
    expect(getByTestId('pbl-toastcard-iconbox')).toHaveStyleRule('fill', expectedIconColor);
    expect(getByTestId('pbl-toastcard-iconbox')).toHaveTextContent('hello');
  });
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <ToastCard {...props} />
    </PabloThemeProvider>
  );
}
