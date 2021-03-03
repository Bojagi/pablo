/* eslint-disable class-methods-use-this */
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { ToastProvider, useToast } from './ToastProvider';
import '../../testUtils/mockResizeObserver';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(cleanup);

test('Render toast stack on the bottom-right by default', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
  });
  expect(getByTestId('pbl-toaststack')).toMatchSnapshot();
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('top', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('left', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('bottom', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('right', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('flex-direction', 'column-reverse');
});

test('Render toast stack on the bottom-right', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'bottom-right',
  });
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('top', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('left', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('bottom', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('right', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('flex-direction', 'column-reverse');
});

test('Render toast stack on the bottom-left', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'bottom-left',
  });
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('top', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('left', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('bottom', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('right', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('flex-direction', 'column-reverse');
});

test('Render toast stack on the top-left', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-left',
  });
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('top', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('left', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('bottom', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('right', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('flex-direction', 'column');
});

test('Render toast stack on the top-right', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-right',
  });
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('top', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('left', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('bottom', undefined);
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('right', '0');
  expect(getByTestId('pbl-toaststack')).toHaveStyleRule('flex-direction', 'column');
});

test('Add a message to toast stack', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
  });

  expect(getByTestId('pbl-toastcard-title')).toHaveTextContent('Hello there');
  expect(getByTestId('pbl-toastcard-description')).toHaveTextContent('Something happened!');
});

test('Add multiple message to toast stack', () => {
  const { getByTestId, getAllByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
    fireEvent.click(getByTestId('add-toast'));
  });

  expect(getAllByTestId('pbl-toastcard-title')[0]).toHaveTextContent('Hello there');
  expect(getAllByTestId('pbl-toastcard-description')[0]).toHaveTextContent('Something happened!');
  expect(getAllByTestId('pbl-toastcard-title')[1]).toHaveTextContent('Hello there');
  expect(getAllByTestId('pbl-toastcard-description')[1]).toHaveTextContent('Something happened!');
});

test('Hide message after duration and animation', () => {
  const { getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
    jest.advanceTimersByTime(399);
  });

  // Should still be there as the animation takes 300ms
  expect(getByTestId('pbl-toastcard-title')).toHaveTextContent('Hello there');
  expect(getByTestId('pbl-toastcard-description')).toHaveTextContent('Something happened!');

  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(getByTestId('pbl-toaststack').childNodes).toHaveLength(0);
});

test('Hide message after default duration and animation', () => {
  const { getByTestId } = renderComponent({
    type: 'success',
    closable: true,
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
    jest.advanceTimersByTime(3300);
  });

  expect(getByTestId('pbl-toaststack').childNodes).toHaveLength(0);
});

test('Hide message after duration and animation with component being unmounted in the meantime', () => {
  const { unmount, getByTestId } = renderComponent({
    duration: 100,
    type: 'success',
    closable: true,
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
    jest.advanceTimersByTime(100);
  });

  unmount();

  act(() => {
    jest.advanceTimersByTime(300);
  });
});

test('Should not hide message after time when duration is 0', () => {
  const { getByTestId } = renderComponent({
    duration: 0,
    type: 'success',
    side: 'top-right',
  });

  act(() => {
    fireEvent.click(getByTestId('add-toast'));
    jest.advanceTimersByTime(1000);
  });

  // Should still be there as duration is 0
  expect(getByTestId('pbl-toastcard-title')).toHaveTextContent('Hello there');
  expect(getByTestId('pbl-toastcard-description')).toHaveTextContent('Something happened!');

  act(() => {
    fireEvent.click(getByTestId('pbl-toastcard-closebtn'));
    jest.advanceTimersByTime(299);
  });

  // Should still be there as the animation takes 300ms
  expect(getByTestId('pbl-toastcard-title')).toHaveTextContent('Hello there');
  expect(getByTestId('pbl-toastcard-description')).toHaveTextContent('Something happened!');

  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(getByTestId('pbl-toaststack').childNodes).toHaveLength(0);
});

function Trigger({ duration, type, closable }) {
  const { addToast } = useToast();

  const handleAddToast = React.useCallback(() => {
    addToast({
      duration,
      title: `Hello there`,
      description: 'Something happened!',
      type,
      closable,
    });
  }, [addToast, closable, type, duration]);

  return <button data-testid="add-toast" onClick={handleAddToast}></button>;
}

function renderComponent({ duration, type, closable, ...props }: any) {
  return render(
    <PabloThemeProvider>
      <ToastProvider {...props}>
        <Trigger duration={duration} type={type} closable={closable} />
      </ToastProvider>
    </PabloThemeProvider>
  );
}
