import {
  render,
  getByTestId as globalGetByTestId,
  getAllByTestId as globalGetAllByTestId,
  fireEvent,
  act,
} from '@testing-library/react';
import React from 'react';
import { css } from '@emotion/react';
import { PabloThemeProvider } from '../theme';
import { themeVars } from '../theme/themeVars';
import { Modal } from './Modal';

test('Render closed modal with just a content element', () => {
  const { container, getByTestId } = renderComponent({ children: <div>Hello World</div> });
  expect(container).toMatchSnapshot();

  // Backdrop
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('width', '100vw');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('height', '100vh');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule(
    'background-color',
    themeVars.colors.blackOpacity[600]
  );
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('display', 'flex');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('justify-content', 'center');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('align-items', 'center');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('opacity', '0');
  // Click though
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('pointer-events', 'none');

  // Modal Area
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('max-width', '780px');
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('padding', /clamp\(1.5rem, .*?, 2.25rem\)/);
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('margin', 'auto'); // Crucial for centering and scrolling
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('min-height', 'min-content'); // Crucial for centering and scrolling

  // ModalBox
  expect(getByTestId('pbl-modal-box')).toHaveStyleRule('border-radius', '12px');
  expect(getByTestId('pbl-modal-box')).toHaveStyleRule(
    'background-color',
    themeVars.colors.background
  );
  expect(getByTestId('pbl-modal-box')).toHaveStyleRule(
    'padding',
    /clamp\(0.75rem, .*?, 1.125rem\)/
  );
  expect(document.body).toHaveStyle('overflow: auto');
});

test('Render open modal', () => {
  const { getByTestId } = renderComponent({ open: true, children: <div>Hello World</div> });
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('opacity', '1');
  // Not click though
  expect(getByTestId('pbl-modal-backdrop')).not.toHaveStyleRule('pointer-events', 'none');
  expect(document.body).toHaveStyle('overflow: hidden');
});

test('Render with maxWidth "small"', () => {
  const { getByTestId } = renderComponent({
    open: true,
    maxWidth: 'small',
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('max-width', '520px');
});

test('Render with maxWidth "medium"', () => {
  const { getByTestId } = renderComponent({
    open: true,
    maxWidth: 'medium',
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('max-width', '780px');
});

test('Render with maxWidth "large"', () => {
  const { getByTestId } = renderComponent({
    open: true,
    maxWidth: 'large',
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('max-width', '1000px');
});

test('Render with maxWidth "full"', () => {
  const { getByTestId } = renderComponent({
    open: true,
    maxWidth: 'full',
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('max-width', '100%');
});

test('Render with title', () => {
  const { getByTestId } = renderComponent({
    open: true,
    title: (
      <>
        Hans <strong>Wurst</strong>
      </>
    ),
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-box')).toMatchSnapshot();
  expect(getByTestId('pbl-modal-title-box')).toHaveTextContent('Hans Wurst');
});

test('Render with topRightItem', () => {
  const { getByTestId } = renderComponent({
    open: true,
    topRightItem: () => <div>something</div>,
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-box')).toMatchSnapshot();
  expect(getByTestId('pbl-modal-title-box')).toHaveTextContent('something');
});

test('Render with title and topRightItem', () => {
  const { getByTestId } = renderComponent({
    open: true,
    title: (
      <>
        Hans <strong>Wurst</strong>
      </>
    ),
    topRightItem: () => <div>something</div>,
    children: <div>Hello World</div>,
  });
  expect(getByTestId('pbl-modal-box')).toMatchSnapshot();
  expect(getByTestId('pbl-modal-title-box')).toHaveTextContent('Hans Wurstsomething');
});

test('Render with additional panes', () => {
  const { getByTestId, getAllByTestId } = renderComponent({
    open: true,
    children: <div>Hello World</div>,
    additionalPanes: [<div>Pane 1</div>, <div>Pane 2</div>, <div>Pane 3</div>],
  });
  expect(getByTestId('pbl-modal-area')).toMatchSnapshot();
  expect(getAllByTestId('pbl-modal-pane')).toBeArrayOfSize(3);
  expect(getAllByTestId('pbl-modal-pane')[0]).toHaveStyleRule(
    'margin-top',
    /clamp\(0.75rem, .*?, 1.125rem\)/
  );
});

test('Close when clicking on the backdrop', () => {
  const onCloseMock = vi.fn();
  const { getByTestId } = renderComponent({
    open: true,
    onClose: onCloseMock,
    children: <div>Hello World</div>,
  });

  expect(onCloseMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(getByTestId('pbl-modal-backdrop'));
  });
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('Do not close when pressing mouse button on box, moving to backdrop and releasing button there', () => {
  const onCloseMock = vi.fn();
  const { getByTestId } = renderComponent({
    open: true,
    onClose: onCloseMock,
    children: <div>Hello World</div>,
  });

  expect(onCloseMock).toHaveBeenCalledTimes(0);
  // Starting click on box
  act(() => {
    fireEvent.mouseDown(getByTestId('pbl-modal-box'));
  });
  // Releasing click over modal should not trigger click event
  act(() => {
    fireEvent.click(getByTestId('pbl-modal-backdrop'));
  });
  expect(onCloseMock).toHaveBeenCalledTimes(0);
});

test('Click on box should not trigger close event', () => {
  const onCloseMock = vi.fn();
  const { getByTestId } = renderComponent({
    open: true,
    onClose: onCloseMock,
    children: <div>Hello World</div>,
  });

  expect(onCloseMock).toHaveBeenCalledTimes(0);
  act(() => {
    fireEvent.click(getByTestId('pbl-modal-box'));
  });
  expect(onCloseMock).toHaveBeenCalledTimes(0);
});

test('Remove mount point on unmount', () => {
  const { container, unmount } = renderComponent({
    open: true,
    children: <div>Hello World</div>,
  });

  expect(container.querySelector('div[data-testid="pbl-modal-mountpoint"')).not.toBeNull();
  unmount();
  expect(container).toMatchSnapshot();
  expect(container.querySelector('div[data-testid="pbl-modal-mountpoint"')).toBeNull();
});

test('Render with custom styles', () => {
  const { getByTestId } = renderComponent(
    {
      open: true,
      maxWidth: 'medium',
      customStyles: {
        box: css`
          border: 5px solid blue;
        `,
        paneBox: css`
          background-color: green;
        `,
        area: css`
          background-color: orange;
        `,
        backdrop: css`
          color: tomato;
        `,
      },
      additionalPanes: [<div>Pane 1</div>],
      children: <div>Hello World</div>,
    },
    {
      modal: {
        styles: {
          box: css`
            background-color: red;
          `,
          paneBox: css`
            padding: 200px;
          `,
          area: css`
            color: blue;
          `,
          backdrop: css`
            background-color: yellow;
          `,
        },
      },
    }
  );

  expect(getByTestId('pbl-modal-box')).toHaveStyleRule('border', '5px solid blue');
  expect(getByTestId('pbl-modal-box')).toHaveStyleRule('background-color', 'red');
  expect(getByTestId('pbl-modal-pane')).toHaveStyleRule('padding', '200px');
  expect(getByTestId('pbl-modal-pane')).toHaveStyleRule('background-color', 'green');
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('color', 'blue');
  expect(getByTestId('pbl-modal-area')).toHaveStyleRule('background-color', 'orange');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('color', 'tomato');
  expect(getByTestId('pbl-modal-backdrop')).toHaveStyleRule('background-color', 'yellow');
});

function renderComponent(props, componentStyles?: any) {
  const { baseElement, unmount } = render(
    <PabloThemeProvider componentStyles={componentStyles}>
      <Modal {...props} />
    </PabloThemeProvider>
  );

  return {
    getByTestId: globalGetByTestId.bind(null, baseElement),
    getAllByTestId: globalGetAllByTestId.bind(null, baseElement),
    unmount,
    container: baseElement,
  };
}
