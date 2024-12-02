import type * as CSS from 'csstype';
import { ifProp } from '../styleHelpers/styleProp';
import { Box, type BoxProps } from './Box';
import styled from '@emotion/styled';

export type FlexProps = BoxProps & {
  center?: boolean;
  equal?: boolean;
  end?: boolean;
  start?: boolean;
  between?: boolean;
  stretch?: boolean;
  direction?: CSS.Property.FlexDirection;
};

const justifyContent = (where: CSS.Property.JustifyContent) => `justify-content: ${where};`;

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${ifProp('center', 'justify-content: center; align-items: center;')}
  ${ifProp('equal', '> * { flex-basis: 100%; flex-grow: 1; flex-shrink: 1; }')}
  ${ifProp('between', justifyContent('space-between'))}
  ${ifProp('end', justifyContent('flex-end'))}
  ${ifProp('start', justifyContent('flex-start'))}
  ${ifProp('stretch', 'align-items: stretch;')}
  ${ifProp('direction', (_, value) => `flex-direction: ${value};`)}
`;
