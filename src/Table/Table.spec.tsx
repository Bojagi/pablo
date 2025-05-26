import React from 'react';
import { render, screen } from '@testing-library/react';
import * as stories from './Table.stories';
import { Table } from './Table';
import { PabloThemeProvider } from '../theme';

test('renders Table with rows and cells', () => {
  render(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Column>Header 1</Table.Column>
          <Table.Column>Header 2</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell 3</Table.Cell>
          <Table.Cell>Cell 4</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  // Check headers
  expect(screen.getByText('Header 1')).toBeInTheDocument();
  expect(screen.getByText('Header 2')).toBeInTheDocument();

  // Check cells
  expect(screen.getByText('Cell 1')).toBeInTheDocument();
  expect(screen.getByText('Cell 2')).toBeInTheDocument();
  expect(screen.getByText('Cell 3')).toBeInTheDocument();
  expect(screen.getByText('Cell 4')).toBeInTheDocument();
});

test('renders Table.Body with rows and cells', () => {
  render(
    <Table.Body>
      <Table.Row>
        <Table.Cell>Body Cell 1</Table.Cell>
        <Table.Cell>Body Cell 2</Table.Cell>
      </Table.Row>
    </Table.Body>
  );

  expect(screen.getByText('Body Cell 1')).toBeInTheDocument();
  expect(screen.getByText('Body Cell 2')).toBeInTheDocument();
});

test('renders Table.Header with rows and columns', () => {
  render(
    <Table.Header>
      <Table.Row>
        <Table.Column>Header Column 1</Table.Column>
        <Table.Column>Header Column 2</Table.Column>
      </Table.Row>
    </Table.Header>
  );

  expect(screen.getByText('Header Column 1')).toBeInTheDocument();
  expect(screen.getByText('Header Column 2')).toBeInTheDocument();
});

test('Simple table story snapshot', () => {
  const { container } = render(createStoryComponent(stories.SimpleTable));
  expect(container.firstChild).toMatchSnapshot();
});

test('Without header story snapshot', () => {
  const { container } = render(createStoryComponent(stories.WithoutHeader));
  expect(container.firstChild).toMatchSnapshot();
});

test('Component content table story snapshot', () => {
  const { container } = render(createStoryComponent(stories.ComponentContentTable));
  expect(container.firstChild).toMatchSnapshot();
});

function createStoryComponent(Story) {
  return (
    <PabloThemeProvider>
      <Story {...Story.args} />
    </PabloThemeProvider>
  );
}
