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
  expect(getByTestId('pbl-buttonbar')).toHaveStyleRule('margin', '0 -4px');
  const allButtons = getAllByTestId('pbl-button');
  expect(allButtons).toBeArrayOfSize(2);
  expect(allButtons[0]).toHaveStyleRule('margin-left', '4px');
  expect(allButtons[0]).toHaveStyleRule('margin-right', '4px');
  expect(allButtons[1]).toHaveStyleRule('margin-left', '4px');
  expect(allButtons[1]).toHaveStyleRule('margin-right', '4px');
});

test('Render button bar with one item', () => {
  const { getByTestId } = renderComponent(
    <ButtonBar>
      <Button>Button 1</Button>
    </ButtonBar>
  );
  expect(getByTestId('pbl-button')).toHaveStyleRule('margin-left', '4px');
  expect(getByTestId('pbl-button')).toHaveStyleRule('margin-right', '4px');
});

function renderComponent(elem) {
  return render(<PabloThemeProvider>{elem}</PabloThemeProvider>);
}
