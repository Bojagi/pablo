import {
  render,
  getByTestId as globalGetByTestId,
  getAllByTestId as globalGetAllByTestId,
  act,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import '../../testUtils/mockResizeObserver';
import { waitOneTick } from '../../testUtils/waitOneTick';

let menuItemClickHandler;

beforeEach(() => {
  menuItemClickHandler = jest.fn();
});

test('Render closed Menu', () => {
  const { container, getByTestId } = renderComponent({});
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-popover-mountpoint')).toBeEmptyDOMElement();
});

test('Render open Menu', async () => {
  const { container, getByTestId } = renderComponent({ open: true });
  await waitOneTick();
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-popover-mountpoint')).not.toBeEmptyDOMElement();
});

test('Click on menu item', async () => {
  const { container, getAllByTestId } = renderComponent({ open: true });
  await waitOneTick();
  expect(container).toMatchSnapshot();
  act(() => {
    fireEvent.click(getAllByTestId('pbl-menu-item')[0]);
  });
  await waitOneTick();
  expect(menuItemClickHandler).toHaveBeenCalledTimes(1);
  expect(menuItemClickHandler).toHaveBeenCalledWith('hi');
});

function renderComponent(props) {
  const { baseElement, unmount } = render(
    <PabloThemeProvider>
      <Menu
        {...props}
        items={[
          <MenuItem key="1" onClick={() => menuItemClickHandler('hi')}>
            Hello
          </MenuItem>,
          <MenuItem key="2" onClick={() => menuItemClickHandler('earth')}>
            World
          </MenuItem>,
        ]}
      >
        <div>Content</div>
      </Menu>
    </PabloThemeProvider>
  );

  return {
    getByTestId: globalGetByTestId.bind(null, baseElement),
    getAllByTestId: globalGetAllByTestId.bind(null, baseElement),
    unmount,
    container: baseElement,
  };
}
