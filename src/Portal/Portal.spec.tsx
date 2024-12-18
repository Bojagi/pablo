import {
  render,
  getByTestId as globalGetByTestId,
  getAllByTestId as globalGetAllByTestId,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider, rootContext } from '../theme';
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

test('Forward ref object with ShadowRoot', async () => {
  const ref: any = {};
  const shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
  renderComponent({ ref }, shadowRoot);
  expect(ref.current).toBeDefined();
  expect(ref.current.getAttribute('data-testid')).toBe('pbl-portal-mountpoint');
  expect(ref.current.parentElement).toBe(shadowRoot);
});

test('Forward ref function with ShadowRoot', () => {
  const ref = jest.fn();
  const shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
  renderComponent({ ref }, shadowRoot);
  expect(ref).toHaveBeenCalledTimes(1);
  expect(ref.mock.calls[0][0].getAttribute('data-testid')).toBe('pbl-portal-mountpoint');
});

function renderComponent(props: object, rootElement: ShadowRoot | Document = document) {
  console.log('document', rootElement);

  const { baseElement, unmount } = render(
    <PabloThemeProvider root={rootElement}>
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
