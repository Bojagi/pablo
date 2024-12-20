import React, { forwardRef, ReactNode } from 'react';
import { Box, Flex, FlexProps, type BoxProps } from '../Box';
import styled from '@emotion/styled';
import { getSpacing } from '../styleHelpers';
import { css } from '@emotion/react';
import { identityTransform, IdentityTransformFn, ResponsiveValue, system } from '../Box/system';
import { flexItem } from '../Box/interpolations/flex';
import { ifPropIs } from '../styleHelpers/styleProp';

type FlexGridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface FlexGridColumnProps extends BoxProps {
  children: ReactNode;
  as?: React.ElementType;
  size: ResponsiveValue<FlexGridSize | 'fillup'>;
}

const InnerColumnBox = forwardRef<HTMLDivElement, FlexGridColumnProps>(
  ({ children, as: As, ...props }, ref) => {
    const InnerComponent = As || Box;
    return (
      <InnerComponent ref={ref} {...props}>
        {children}
      </InnerComponent>
    );
  }
);

const columnSizeInterpolationFn = system({
  properties: ['--pbl-flexgrid-column-width'],
  fromProps: ['size'],
  transform: identityTransform as IdentityTransformFn<FlexGridSize | 'fillup'>,
});

const FlexGridColumn = styled(InnerColumnBox)`
  ${columnSizeInterpolationFn}
  flex-basis: auto;
  ${ifPropIs('size', 'fillup', flexItem.grow(1))}
  ${(props: FlexGridColumnProps) =>
    props.size !== 'fillup' &&
    css`
      width: calc(
        100% * var(--pbl-flexgrid-column-width) / var(--pbl-flexgrid-columns) -
          (var(--pbl-flexgrid-columns) - var(--pbl-flexgrid-column-width)) *
          (var(--pbl-flexgrid-gap-column) / var(--pbl-flexgrid-columns))
      );
    `}
`;

type GapTuple = [number | string, number | string];
interface GridBoxProps extends Omit<FlexProps, 'gap'> {
  columns?: number;
  gapTuple: GapTuple;
  children: ReactNode;
}

interface FlexGridProps extends Omit<GridBoxProps, 'gapTuple'> {
  gap?: number | string | GapTuple;
}

const GridBox = styled(Flex)<GridBoxProps>`
  ${(props) => css`
    --pbl-flexgrid-columns: ${props.columns || 12};
    --pbl-flexgrid-gap-column: ${getSpacing(props.gapTuple[0])(props)};
    --pbl-flexgrid-gap-row: ${getSpacing(props.gapTuple[1])(props)};
  `}
  flex-wrap: wrap;
  gap: var(--pbl-flexgrid-gap-row) var(--pbl-flexgrid-gap-column);
`;

const FlexGrid = ({ children, gap = 2, ...props }: FlexGridProps) => {
  const tuple = Array.isArray(gap) ? gap : ([gap, gap] as [number, number]);
  return (
    <GridBox {...(props as any)} gapTuple={tuple}>
      {children}
    </GridBox>
  );
};

FlexGrid.Column = FlexGridColumn;

export { FlexGrid, FlexGridColumn };
export type { FlexGridSize, FlexGridColumnProps, FlexGridProps };
