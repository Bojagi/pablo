import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Card } from './Card';

test('Render card', () => {
  const { container } = renderComponent({});
  expect(container).toMatchSnapshot();
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Card {...props}>Hello</Card>
    </PabloThemeProvider>
  );
}
