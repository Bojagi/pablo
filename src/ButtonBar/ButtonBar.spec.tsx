import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../Button/Button';
import { PabloThemeProvider } from '../theme';
import { ButtonBar } from './ButtonBar';

test('Render button bar', () => {
  const { container, getByTestId, getAllByTestId } = renderComponent(
    <ButtonBar>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonBar>
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId('pbl-buttonbar')).toHaveStyleRule('gap', '0.25rem 0.25rem');
  const allButtons = getAllByTestId('pbl-button');
  expect(allButtons).toBeArrayOfSize(2);
});

test('Render button bar with one item', () => {
  const { container } = renderComponent(
    <ButtonBar>
      <Button>Button 1</Button>
    </ButtonBar>
  );
  expect(container).toMatchSnapshot();
});

function renderComponent(elem) {
  return render(<PabloThemeProvider>{elem}</PabloThemeProvider>);
}
