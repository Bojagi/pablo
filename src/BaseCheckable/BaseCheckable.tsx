import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { useComponentStyleContext } from '../theme/context';
import { Typography } from '../Typography';
import { hijackCbBefore } from '../utils/hijackCb';
import { useUniqueId } from '../utils/useUniqueId';

export type CheckableSize = 'small' | 'medium';

export interface BaseCheckableProps extends BoxProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  size?: CheckableSize;
  value?: string;
  label?: React.ReactNode;
  checked: boolean;
  onChange: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface CheckableBoxProps {
  className?: string;
  disabled?: boolean;
  size?: CheckableSize;
  focus: boolean;
}

export interface CheckableHandleProps {
  disabled?: boolean;
  checked: boolean;
  size?: CheckableSize;
}

export interface OuterBaseCheckableProps extends BaseCheckableProps {
  componentName: 'radio' | 'switch' | 'checkbox';
  componentType: 'radio' | 'checkbox';
  componentBox: React.FC<CheckableBoxProps>;
  componentHandle: React.FC<CheckableHandleProps>;
}

const HiddenInput = styled.input`
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
    `}
`;

export function BaseCheckable({
  componentName,
  componentType,
  componentBox: ComponentBox,
  componentHandle: ComponentHandle,
  className,
  id: idProp,
  size = 'medium',
  name,
  disabled,
  checked,
  label,
  value,
  onChange,
  onClick,
  onFocus,
  onBlur,
  ...props
}: OuterBaseCheckableProps) {
  const generatedId = useUniqueId(componentName);
  const id = idProp || generatedId;
  const componentStyles = useComponentStyleContext();
  const typographyVariant = componentStyles[componentName].typographyVariant[size];
  const [focus, setFocus] = React.useState(false);

  return (
    <Box flex alignItems="center" {...props}>
      <ComponentBox
        className={className}
        data-testid={`pbl-${componentName}`}
        disabled={disabled}
        size={size}
        focus={focus}
      >
        <ComponentHandle
          data-testid={`pbl-${componentName}-handle`}
          checked={checked}
          size={size}
        />
        <HiddenInput
          id={id}
          data-testid={`pbl-${componentName}-input`}
          name={name}
          checked={checked}
          disabled={disabled}
          type={componentType}
          value={value}
          onClick={onClick}
          onChange={
            onChange
              ? (e) => {
                  onChange(e.target.value, e);
                }
              : undefined
          }
          onFocus={hijackCbBefore(onFocus, () => setFocus(true))}
          onBlur={hijackCbBefore(onBlur, () => setFocus(false))}
        />
      </ComponentBox>
      {label && (
        <label data-testid={`pbl-${componentName}-label`} htmlFor={id}>
          <Typography ml={1} mb={0} variant={typographyVariant}>
            {label}
          </Typography>
        </label>
      )}
    </Box>
  );
}
