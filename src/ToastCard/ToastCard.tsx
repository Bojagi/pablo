import React, { ReactElement, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Box, boxInterpolateFn, BoxProps, ColorPath } from '../Box';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../Icons';
import { useComponentStyle } from '../theme';
import { Paragraph, Subtitle } from '../Typography';
import { getComponentStyle, shadowTransformer } from '../utils/styleHelpers';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './Icons';

const CardWrapper = styled.div`
  border-radius: ${getComponentStyle('toastCard.borderRadius')};
  max-width: ${getComponentStyle('toastCard.width')};
  box-sizing: border-box;
  background-color: ${getComponentStyle('toastCard.backgroundColor')};
  color: ${getComponentStyle('toastCard.color')};
  padding: ${getComponentStyle('toastCard.padding')};
  box-shadow: ${getComponentStyle('toastCard.shadow', shadowTransformer)};
  ${boxInterpolateFn};
`;

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastCardProps extends BoxProps {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastType;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const iconColors: Record<ToastType, string> = {
  info: 'common.white',
  success: 'positive.main',
  warning: 'neutral.main',
  error: 'negative.main',
};

const icons: Record<ToastType, ReactElement> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

const displayBlockIconsCss = css`
  & > * {
    display: block;
  }
`;

export function ToastCard({
  title,
  description,
  type,
  icon,
  closable = false,
  onClose = () => {},
  ...props
}: ToastCardProps) {
  const color = useComponentStyle('toastCard.color') as string;
  return (
    <CardWrapper {...props}>
      <Box flex alignItems={description ? 'flex-start' : 'center'}>
        {(type || icon) && (
          <Box
            mr={1.5}
            display="inline-block"
            fillColor={iconColors[type || 'info'] as ColorPath}
            css={displayBlockIconsCss}
          >
            {icon || icons[type || 'info']}
          </Box>
        )}
        <Box flexGrow={1}>
          <Box flex>
            <Subtitle flexGrow={1} inline={!description}>
              {title}
            </Subtitle>
            {closable && (
              <IconButton mx={-1} onClick={onClose} size="small" fillColor={color}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {description && <Paragraph inline>{description}</Paragraph>}
        </Box>
      </Box>
    </CardWrapper>
  );
}
