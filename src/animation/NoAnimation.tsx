import { css } from '@emotion/react';
import { createInOutAnimation } from './InOutAnimation';

const style = css`
  visibility: hidden;
  transition: none;
`;

export const NoAnimation = createInOutAnimation({
  exitedStyles: style,
  exitingStyles: style,
});
