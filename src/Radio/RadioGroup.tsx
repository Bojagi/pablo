import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { getComponentStyleByProp } from '../styleHelpers';
import { RadioSize } from './Radio';

const RadioGroupItem = styled.div<{ size: RadioSize }>`
  margin-bottom: ${getComponentStyleByProp('size', 'radio.groupItemGap.')};
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
