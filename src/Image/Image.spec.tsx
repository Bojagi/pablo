import { render } from '@testing-library/react';
import React from 'react';
import { PabloThemeProvider } from '../theme';
import { Image } from './Image';

test('Render image', () => {
  const { container } = renderComponent({
    alt: 'Social media preview',
    src: 'https://bojagi.io/images/bojagi-social-preview.jpg',
  });
  expect(container).toMatchSnapshot();
});

function renderComponent(props) {
  return render(
    <PabloThemeProvider>
      <Image {...props} />
    </PabloThemeProvider>
  );
}
