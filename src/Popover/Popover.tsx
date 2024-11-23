import React, { forwardRef, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from '@emotion/styled';
import { Portal } from '../Portal/Portal';
import { ClickOutside } from '../ClickOutside/ClickOutside';
import { setRef } from '../utils/setRef';
import { useReRenderForwardRef } from '../utils/useForwardRef';
import { InOutAnimationProps, NoAnimation } from '../animation';
import { useDelayedBooleanState } from '../utils/useDelayBooleanState';
import { baseStyle } from '../shared/baseStyle';
import type { Placement } from '@popperjs/core';
import type { ComponentElement, ComponentType, ReactElement, ReactNode, Ref } from 'react';

export interface PopoverProps {
  children: ComponentElement<any, any>;
  content: ReactNode;
  placement: Placement;
  offset?: number;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickOutside?: () => void;
  arrow?: ReactElement;
  open: boolean;
  animation?: ComponentType<InOutAnimationProps>;
  animationProps?: Omit<InOutAnimationProps, 'visible' | 'children'> & Record<string, any>;
  'aria-haspopup'?: string;
}

const PopoverWrapper = styled.div`
  ${baseStyle}
  z-index: 1100;
`;

export const Popover = forwardRef(
  (
    {
      children,
      content,
      placement,
      open,
      delay = 0,
      offset = 0,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      onClickOutside = () => {},
      arrow = <div />,
      animation: Animation = NoAnimation,
      animationProps = { duration: 0 },
      'aria-haspopup': ariaHasPopup,
    }: PopoverProps,
    ref
  ) => {
    const [innerOpen, setInnerOpen] = useDelayedBooleanState(open, delay, animationProps.duration);
    const [referenceElement, setReferenceElement] = useReRenderForwardRef<HTMLElement | null>(
      children.ref as Ref<HTMLElement>
    );

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      setInnerOpen(open);
    }, [open, setInnerOpen]);

    useEffect(() => {
      if (referenceElement) {
        referenceElement.addEventListener('mouseenter', onMouseEnter);
        referenceElement.addEventListener('mouseleave', onMouseLeave);
        return () => {
          referenceElement.removeEventListener('mouseenter', onMouseEnter);
          referenceElement.removeEventListener('mouseleave', onMouseLeave);
        };
      }

      return () => {};
    }, [referenceElement, onMouseEnter, onMouseLeave]);

    useEffect(() => {
      setRef(ref, popperElement);
    }, [ref, popperElement]);

    const handleClickOutside = React.useMemo(
      () => (open ? onClickOutside : () => {}),
      [open, onClickOutside]
    );

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10 + offset],
          },
        },
        {
          name: 'arrow',
          options: {
            element: arrowElement,
            padding: 10,
          },
        },
      ],
      placement,
      strategy: 'fixed',
    });

    const clonedElement = React.useMemo(
      () =>
        React.cloneElement(children, {
          ref: setReferenceElement,
          'aria-haspopup': ariaHasPopup,
        }),
      [ariaHasPopup, children, setReferenceElement]
    );

    const clonedArrow = React.useMemo(
      () =>
        React.cloneElement(arrow, {
          ref: setArrowElement,
          style: styles.arrow,
        }),
      [arrow, styles.arrow]
    );

    return (
      <>
        {clonedElement}
        <Portal name="popover">
          {innerOpen && (
            <PopoverWrapper ref={setPopperElement} style={styles.popper} {...attributes.popper}>
              <ClickOutside onClickOutside={handleClickOutside}>
                <Animation {...animationProps} visible={open}>
                  <div>{content}</div>
                  {clonedArrow}
                </Animation>
              </ClickOutside>
            </PopoverWrapper>
          )}
        </Portal>
      </>
    );
  }
);
