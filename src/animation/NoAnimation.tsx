import { css } from '@emotion/react';
import { createInOutAnimation } from './InOutAnimation';

const noAnimationExit = css`
  visibility: hidden;
`;

export const NoAnimation = createInOutAnimation({
  exitStyles: noAnimationExit,
});
