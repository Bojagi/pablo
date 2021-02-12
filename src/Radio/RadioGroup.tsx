import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { getComponentStyle } from '../styleHelpers';
import { RadioSize } from './Radio';

const RadioGroupItem = styled.div<{ size: RadioSize }>`
  margin-bottom: ${getComponentStyle('radio.groupItemGap.{size}')};
`;

export function RadioGroup({ value, onChange, children, size, ...props }) {
  return (
    <Box role="radiogroup" {...props}>
      {children.map((child) => (
        <RadioGroupItem size={size}>
          {React.cloneElement(child, {
            checked: value === child.props.value,
            size,
            onChange: () => {
              onChange(child.props.value);
            },
          })}
        </RadioGroupItem>
      ))}
    </Box>
  );
}
