import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { defaultTheme, PabloThemeProvider } from '../theme';
import { SidebarNav } from './SidebarNav';
import { SidebarNavItem } from './SidebarNavItem';

let onSelectMock;

beforeEach(() => {
  onSelectMock = jest.fn();
});

afterEach(cleanup);

test('Render one nav item', () => {
  const { container } = render(
    <PabloThemeProvider>
      <SidebarNav>
        <SidebarNavItem selected>Hello</SidebarNavItem>
      </SidebarNav>
    </PabloThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Render multiple nav items', () => {
  const { container, getAllByTestId } = renderComponent({});
  expect(container).toMatchSnapshot();
  const allSidebarNav = getAllByTestId('pbl-sidebarnav-item');
  expect(allSidebarNav).toHaveLength(3);
  expect(allSidebarNav[0]).toHaveTextContent('Hello');
  expect(allSidebarNav[1]).toHaveTextContent('World');
  expect(allSidebarNav[2]).toHaveTextContent('Bye');
  expect(allSidebarNav[0]).toHaveStyleRule('background-color', undefined);
  expect(allSidebarNav[1]).toHaveStyleRule('background-color', defaultTheme.colors.brand.lightest);
  expect(allSidebarNav[2]).toHaveStyleRule('background-color', undefined);
});

function renderComponent(props) {
  return render(getRenderHtml(props));
}

function getRenderHtml(props) {
  return (
    <PabloThemeProvider>
      <SidebarNav onSelect={onSelectMock} {...props}>
        <SidebarNavItem>Hello</SidebarNavItem>
        <SidebarNavItem selected>World</SidebarNavItem>
        <SidebarNavItem>Bye</SidebarNavItem>
      </SidebarNav>
    </PabloThemeProvider>
  );
}
