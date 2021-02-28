import {
  render,
  getByTestId as globalGetByTestId,
  getAllByTestId as globalGetAllByTestId,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Portal } from './Portal';

test('Render Portal component', () => {
  const ref: any = {};
  const { container } = renderComponent({ ref });
  expect(container).toMatchSnapshot();
});

test('Forward ref object', () => {
  const ref: any = {};
  renderComponent({ ref });
  expect(ref.current).toBeDefined();
  expect(ref.current.getAttribute('data-testid')).toBe('pbl-portal-mountpoint');
});

test('Forward ref function', () => {
  const ref = jest.fn();
  renderComponent({ ref });
  expect(ref).toHaveBeenCalledTimes(1);
  expect(ref.mock.calls[0][0].getAttribute('data-testid')).toBe('pbl-portal-mountpoint');
});

function renderComponent(props) {
  const { baseElement, unmount } = render(
    <PabloThemeProvider>
      <Portal name="portal" {...props}>
        <div data-testid="outside-elem">Outside content</div>
      </Portal>
    </PabloThemeProvider>
  );

  return {
    getByTestId: globalGetByTestId.bind(null, baseElement),
    getAllByTestId: globalGetAllByTestId.bind(null, baseElement),
    unmount,
    container: baseElement,
  };
}
