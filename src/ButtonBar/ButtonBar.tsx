import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { BoxProps, Flex, FlexProps } from '../Box';
import { useComponentStyle } from '../theme/useComponentStyle';
import { getCustomStyles } from '../utils/useCustomStyles';
import { ButtonBarStyleProperties } from './styles';
import { BaseProps } from '../types';

export interface ButtonBarProps extends BaseProps<ButtonBarStyleProperties>, FlexProps {
  children: React.ReactElement<BoxProps> | React.ReactElement<BoxProps>[];
}

const ButtonBarBox = styled(Flex)`
  ${getCustomStyles('buttonBar.styles', 'root')}
`;

export const ButtonBar = forwardRef<HTMLDivElement, ButtonBarProps>(
  ({ children, ...props }: ButtonBarProps, ref) => {
    const gap = useComponentStyle('buttonBar.gap');
    return (
      <ButtonBarBox center end gap={gap} ref={ref} data-testid="pbl-buttonbar" {...props}>
        {children}
      </ButtonBarBox>
    );
  }
);
