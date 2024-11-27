import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex, Box, layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../Icons';
import { useComponentStyle } from '../theme/useComponentStyle';
import { Paragraph, Subtitle } from '../Typography';
import { getComponentStyle, shadowTransformer } from '../styleHelpers';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './Icons';
import { getCustomStyles, useCustomStyles } from '../utils/useCustomStyles';
import { BaseProps } from '../types';
import { ToastCardStyleProperties } from './styles';
import { baseStyle } from '../shared/baseStyle';
import { themeVars } from '../theme/themeVars';
import { useUniqueId } from '../utils/useUniqueId';

const CardWrapper = styled.div<LayoutBoxProps>`
  ${baseStyle}
  border-radius: ${getComponentStyle('toastCard.borderRadius')};
  max-width: ${getComponentStyle('toastCard.width')};
  background-color: ${getComponentStyle('toastCard.backgroundColor')};
  color: ${getComponentStyle('toastCard.color')};
  padding: ${getComponentStyle('toastCard.padding')};
  box-shadow: ${getComponentStyle('toastCard.shadow', shadowTransformer)};
  ${layoutInterpolationFn}
  ${getCustomStyles('toastCard.styles', 'card')}
`;

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastCardProps extends LayoutBoxProps, BaseProps<ToastCardStyleProperties> {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastType;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  role?: 'alert' | 'status';
}

const ALLOWED_TYPES: ToastType[] = ['info', 'success', 'warning', 'error'];

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

export const ToastCard = forwardRef<HTMLDivElement, ToastCardProps>(
  (
    { title, description, type: typeProp, icon, closable = false, onClose = () => {}, ...props },
    ref
  ) => {
    const type = typeProp === undefined || ALLOWED_TYPES.includes(typeProp) ? typeProp : 'info';
    const color = useComponentStyle('toastCard.color') as string;
    const getStyles = useCustomStyles('avatar.styles', props.customStyles);
    const generatedId = useUniqueId();
    const titleId = `${generatedId}-title`;
    const descriptionId = `${generatedId}-title`;

    return (
      <CardWrapper
        ref={ref}
        id={generatedId}
        data-testid="pbl-toastcard"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...props}
      >
        <Flex alignItems={description ? 'flex-start' : 'center'}>
          {(type || icon) && (
            <Box
              mr={1.5}
              data-testid="pbl-toastcard-iconbox"
              fillColor={iconColors[type || 'info']}
              css={[displayBlockIconsCss, ...getStyles('iconBox')]}
            >
              {icon || icons[type!]}
            </Box>
          )}
          <Box flexGrow={1}>
            <Flex>
              <Subtitle
                data-testid="pbl-toastcard-title"
                id={titleId}
                flexGrow={1}
                inline={!description}
                customStyles={{
                  subtitle: getStyles('title'),
                }}
              >
                {title}
              </Subtitle>
              {closable && (
                <IconButton
                  data-testid="pbl-toastcard-closebtn"
                  mx={-1.5}
                  onClick={onClose}
                  size="small"
                  css={(props) =>
                    css`
                      fill: ${color};
                      &:hover:enabled {
                        background-color: ${themeVars.colors.blackOpacity[300]};
                      }
                      ${getStyles('closeButton', props)}
                    ` as any
                  }
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Flex>
            {description && (
              <Paragraph
                inline
                id={descriptionId}
                data-testid="pbl-toastcard-description"
                customStyles={{
                  paragraph: getStyles('description'),
                }}
              >
                {description}
              </Paragraph>
            )}
          </Box>
        </Flex>
      </CardWrapper>
    );
  }
);
