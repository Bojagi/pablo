// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import React from 'react';
import styled from '@emotion/styled';

export function renderStyledComponent(props, interpolateFn) {
  const Component = styled.div`
    ${interpolateFn(props)}
  `;
  const { container } = render(<Component {...props} />);
  return container.firstChild;
}
