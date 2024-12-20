import { ifProp } from '../styleHelpers/styleProp';
import { Box, type BoxProps } from './Box';
import styled from '@emotion/styled';
import { flexContainer, FlexContainerProps } from './interpolations/flex';

export type FlexProps = BoxProps &
  FlexContainerProps & {
    center?: boolean;
    equal?: boolean;
    end?: boolean;
    start?: boolean;
    between?: boolean;
    stretch?: boolean;
  };

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexContainer}
  ${ifProp('center', 'justify-content: center; align-items: center;')}
  ${ifProp('equal', '> * { flex-basis: 100%; flex-grow: 1; flex-shrink: 1; }')}
  ${ifProp('stretch', 'align-items: stretch;')}
  ${ifProp('between', flexContainer.justifyContent('space-between'))}
  ${ifProp('end', flexContainer.justifyContent('flex-end'))}
  ${ifProp('start', flexContainer.justifyContent('flex-start'))}
`;
