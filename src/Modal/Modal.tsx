import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { Box } from '../Box';
import { Title } from '../Typography';
import { getComponentStyle } from '../utils/styleHelpers';

export interface TopRightItemProps {
  onClose?: () => void;
}

export interface ModalProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  additionalPanes?: React.ReactNode[];
  topRightItem?: React.FC<TopRightItemProps>;
  open?: boolean;
}

interface BackdropProps {
  open: boolean;
  onClick: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const Backdrop = styled.div<BackdropProps>`
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${getComponentStyle('modal.backdropColor')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ModalArea = styled.div`
  width: ${getComponentStyle('modal.box.width')};
`;

const ModalBox = styled.div`
  border-radius: ${getComponentStyle('modal.box.borderRadius')}px;
  background-color: ${getComponentStyle('modal.box.backgroundColor')};
  padding: ${getComponentStyle('modal.box.padding')};
`;

export function Modal({
  children,
  additionalPanes,
  topRightItem: TopRightItem,
  onClose,
  title,
  open = false,
}: ModalProps) {
  const mountPoint = React.useMemo(() => document.createElement('div'), []);
  React.useEffect(() => {
    document.body.appendChild(mountPoint);
    return () => {
      document.body.removeChild(mountPoint);
    };
  }, [mountPoint]);

  const mouseDownRef = React.useRef<HTMLElement>(null);
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

  return ReactDOM.createPortal(
    <Backdrop onClick={handleClose} open={open}>
      <ModalArea>
        <ModalBox
          onMouseDown={(e) => {
            (mouseDownRef.current as any) = e.currentTarget;
          }}
        >
          {(title || TopRightItem) && (
            <Box flex justifyContent="space-between">
              {title && <Title>{title}</Title>}
              {TopRightItem && <TopRightItem onClose={onClose} />}
            </Box>
          )}
          {children}
        </ModalBox>
        {additionalPanes &&
          additionalPanes.map((pane) => (
            <Box mt={1.5}>
              <ModalBox>{pane}</ModalBox>
            </Box>
          ))}
      </ModalArea>
    </Backdrop>,
    mountPoint
  );
}
