import React, { forwardRef, ReactNode } from 'react';
import { Box, type BoxProps } from '../Box';
import styled from '@emotion/styled';
import { getSpacing } from '../styleHelpers';
import { omit } from '../utils/omit';
import { css } from '@emotion/react';
import { system } from '@styled-system/core';
import type { ResponsiveValue } from 'styled-system';

type FlexGridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface FlexGridColumnProps extends Omit<BoxProps, 'size'> {
  children: ReactNode;
  size: ResponsiveValue<FlexGridSize> | 'fillup';
}

const InnerColumnBox = forwardRef<HTMLDivElement, FlexGridColumnProps>(
  ({ children, ...props }, ref) => {
    const innerProps = omit(props, ['size']);

    return (
      <>
        <Box ref={ref} {...innerProps}>
          {children}
        </Box>
      </>
    );
  }
);

const columnSizeInterpolationFn = system({
  size: {
    property: '--pbl-flexgrid-column-width' as any,
  },
});

const FlexGridColumn = styled(InnerColumnBox)`
  ${columnSizeInterpolationFn}
  flex-basis: auto;
  ${(props) =>
    props.size === 'fillup' &&
    css`
      flex-grow: 1;
    `}
  ${(props) =>
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
interface GridBoxProps extends Omit<BoxProps, 'gap'> {
  columns?: number;
  gapTuple: GapTuple;
  children: ReactNode;
}

interface FlexGridProps extends Omit<GridBoxProps, 'gapTuple'> {
  gap?: number | string | GapTuple;
}

const GridBox = styled(Box)<GridBoxProps>`
  ${(props) => css`
    --pbl-flexgrid-columns: ${props.columns || 12};
    --pbl-flexgrid-gap-column: ${getSpacing(props.gapTuple[0])(props)};
    --pbl-flexgrid-gap-row: ${getSpacing(props.gapTuple[1])(props)};
  `}
  display: flex;
  flex-wrap: wrap;
  gap: var(--pbl-flexgrid-gap-row) var(--pbl-flexgrid-gap-column);
`;

const FlexGrid = ({ children, gap = 2, ...props }: FlexGridProps) => {
  const tuple = Array.isArray(gap) ? gap : ([gap, gap] as [number, number]);
  return (
    <GridBox {...props} gapTuple={tuple}>
      {children}
    </GridBox>
  );
};

FlexGrid.Column = FlexGridColumn;

export { FlexGrid, FlexGridColumn };
export type { FlexGridSize, FlexGridColumnProps, FlexGridProps };
