import type * as CSS from 'csstype';
import { ifProp } from '../styleHelpers/styleProp';
import { Box, type BoxProps } from './Box';
import styled from '@emotion/styled';
import { flexContainer } from './interpolations/flex';
import { PabloThemeableProps } from '../theme/types';

export type FlexProps = BoxProps & {
  center?: boolean;
  equal?: boolean;
  end?: boolean;
  start?: boolean;
  between?: boolean;
  stretch?: boolean;
  direction?: CSS.Property.FlexDirection;
};

type InternalFlexProps = PabloThemeableProps & FlexProps;

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexContainer}
  ${ifProp('center', 'justify-content: center; align-items: center;')}
  ${ifProp('equal', '> * { flex-basis: 100%; flex-grow: 1; flex-shrink: 1; }')}
  ${ifProp('stretch', 'align-items: stretch;')}
  ${ifProp<InternalFlexProps>('between', flexContainer.justifyContent('space-between'))}
  ${ifProp<InternalFlexProps>('end', flexContainer.justifyContent('flex-end'))}
  ${ifProp<InternalFlexProps>('start', flexContainer.justifyContent('flex-start'))}
`;
