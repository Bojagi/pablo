import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from '../Box';
import { Title } from '../Typography';
import { getComponentStyle, shadowTransformer, transitionTransformer } from '../styleHelpers';
import { Portal } from '../Portal/Portal';
import { BaseProps, CssFunctionReturn } from '../types';
import { ModalStyleProperties } from './styles';
import { useCustomStyles } from '../utils/useCustomStyles';

export interface TopRightItemProps {
  onClose?: () => void;
}

export type ModalMaxWidth = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps extends BaseProps<ModalStyleProperties> {
  children: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  animate?: boolean;
  maxWidth?: ModalMaxWidth;
  additionalPanes?: React.ReactNode[];
  topRightItem?: React.FC<TopRightItemProps>;
  open?: boolean;
}

interface BackdropProps {
  open: boolean;
  onClick: (e: React.PointerEvent<HTMLDivElement>) => void;
  css?: CssFunctionReturn;
}

const Backdrop = styled.div<BackdropProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  box-sizing: border-box;
  overflow: scroll;
  background-color: ${getComponentStyle('modal.backdropColor')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${getComponentStyle('modal.backdropTransition', transitionTransformer)};
  ${(props) => props.css}
  ${(props) =>
    props.open
      ? css`
          opacity: 1;
        `
      : css`
          pointer-events: none;
          opacity: 0;
        `}
`;

interface ModalAreaProps {
  open: boolean;
  animate: boolean;
  maxWidth: ModalMaxWidth;
  css?: CssFunctionReturn;
}

const ModalArea = styled.div<ModalAreaProps>`
  ${(props) =>
    !props.open &&
    css`
      transform: ${getComponentStyle('modal.box.closedTransform')};
    `}
  ${(props) =>
    props.animate &&
    css`
      transition: ${getComponentStyle('modal.box.transition', transitionTransformer)};
    `}
  max-width: ${getComponentStyle('modal.box.maxWidth.{maxWidth}')};
  margin: auto;
  min-height: min-content;
  padding: ${getComponentStyle('modal.padding')};
  ${(props) => props.css}
`;

interface ModalBoxProps {
  css?: CssFunctionReturn;
}

const ModalBox = styled.div<ModalBoxProps>`
  border-radius: ${getComponentStyle('modal.box.borderRadius')}px;
  background-color: ${getComponentStyle('modal.box.backgroundColor')};
  padding: ${getComponentStyle('modal.box.padding')};
  box-shadow: ${getComponentStyle('modal.box.shadow', shadowTransformer)};
  ${(props) => props.css}
`;

const PaneBox = styled.div<ModalBoxProps>`
  margin-top: ${getComponentStyle('modal.gap')};
  ${(props) => props.css}
`;

export function Modal({
  children,
  additionalPanes,
  topRightItem: TopRightItem,
  onClose,
  title,
  maxWidth = 'medium',
  animate = true,
  open = false,
  customStyles = {},
}: ModalProps) {
  const mouseDownRef = React.useRef<HTMLElement>(null);
  const getCustomStyles = useCustomStyles(customStyles);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const handleClose = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only close if the mouse down before the click happened directly over the backdrop
      if (e.target === e.currentTarget && !mouseDownRef.current && onClose) {
        onClose();
      }
      (mouseDownRef.current as any) = null;
    },
    [onClose]
  );

  return (
    <Portal name="modal">
      <Backdrop
        data-testid="pbl-modal-backdrop"
        onClick={handleClose}
        open={open}
        css={getCustomStyles('backdrop')}
      >
        <ModalArea
          data-testid="pbl-modal-area"
          maxWidth={maxWidth}
          open={open}
          animate={animate}
          css={getCustomStyles('area')}
        >
          <ModalBox
            data-testid="pbl-modal-box"
            onMouseDown={(e) => {
              (mouseDownRef.current as any) = e.currentTarget;
            }}
            css={getCustomStyles('box')}
          >
            {(title || TopRightItem) && (
              <Flex data-testid="pbl-modal-title-box" justifyContent="space-between">
                {title && <Title>{title}</Title>}
                {TopRightItem && <TopRightItem onClose={onClose} />}
              </Flex>
            )}
            {children}
          </ModalBox>
          {additionalPanes &&
            additionalPanes.map((pane, i) => (
              <PaneBox key={i} data-testid="pbl-modal-pane" css={getCustomStyles('paneBox')}>
                <ModalBox data-testid="pbl-modal-pane-box" css={getCustomStyles('box')}>
                  {pane}
                </ModalBox>
              </PaneBox>
            ))}
        </ModalArea>
      </Backdrop>
    </Portal>
  );
}
