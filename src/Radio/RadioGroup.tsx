import React from 'react';
import styled from 'styled-components';
import { CheckableSize } from '../BaseCheckable/BaseCheckable';
import { Box, BoxProps } from '../Box';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';
import { RadioProps } from './Radio';

const RadioGroupItem = styled.div<{ size: CheckableSize }>`
  margin-bottom: ${getComponentStyle('radio.groupItemGap.{size}')};
`;

export interface RadioGroupProps extends BoxProps {
  value?: string;
  onChange: (value: string) => void;
  children: React.ReactElement<RadioProps> | React.ReactElement<RadioProps>[];
  size?: CheckableSize;
  name?: string;
}

export function RadioGroup({
  value,
  onChange,
  name,
  children,
  size = 'medium',
  ...props
}: RadioGroupProps) {
  return (
    <Box role="radiogroup" {...props}>
      {guaranteeArray(children).map((child) => (
        <RadioGroupItem key={child.props.value} size={size}>
          {React.cloneElement(child, {
            checked: value === child.props.value,
            size,
            name,
            onChange: () => {
              onChange(child.props.value);
            },
          })}
        </RadioGroupItem>
      ))}
    </Box>
  );
}
