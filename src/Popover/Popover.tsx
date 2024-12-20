import React, { forwardRef, useEffect, useState, useMemo, cloneElement } from 'react';
import styled from '@emotion/styled';
import { Portal } from '../Portal/Portal';
import { ClickOutside } from '../ClickOutside/ClickOutside';
import { setRef } from '../utils/setRef';
import { useReRenderForwardRef } from '../utils/useForwardRef';
import { AnimationSetupProps, InOutAnimationProps, NoAnimation } from '../animation';
import { useDelayedBooleanState } from '../utils/useDelayBooleanState';
import { baseStyle } from '../shared/baseStyle';
import type { ComponentElement, ComponentType, ReactElement, ReactNode, Ref } from 'react';
import { useNanopop } from './useNanopop';
import type { NanoPopPosition, PositionMatch } from 'nanopop';

export interface PopoverProps<A extends object = object> {
  children: ComponentElement<any, any>;
  content: ReactNode;
  placement: NanoPopPosition;
  offset?: number;
  delay?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickOutside?: () => void;
  arrow?: ReactElement;
  open: boolean;
  animation?: ComponentType<InOutAnimationProps<A>>;
  animationProps?: AnimationSetupProps & A;
  'aria-haspopup'?: string;
}

const PopoverWrapper = styled.div`
  ${baseStyle}
  position: fixed;
  z-index: 1100;
`;

const DefaultArrow = styled.div``;

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
      onClick,
      onClickOutside = () => {},
      arrow = <DefaultArrow />,
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
    const [positionMatch, setPositionMatch] = useState<PositionMatch | null>(null);

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

    const handleClickOutside = useMemo(
      () => (open ? onClickOutside : () => {}),
      [open, onClickOutside]
    );

    useNanopop({
      referenceElement,
      popperElement,
      arrowElement,
      margin: 10 + offset,
      position: placement,
      onChange: setPositionMatch,
    });

    const clonedElement = useMemo(
      () =>
        cloneElement(children, {
          ref: setReferenceElement,
          onClick: (...args) => {
            onClick?.();
            children.props.onClick?.(...args);
          },
          'aria-haspopup': ariaHasPopup,
        }),
      [ariaHasPopup, children, onClick, setReferenceElement]
    );

    const clonedArrow = useMemo(
      () =>
        cloneElement(arrow, {
          ref: setArrowElement,
          positionMatch,
        }),
      [arrow, positionMatch]
    );

    return (
      <>
        {clonedElement}
        <Portal name="popover">
          {innerOpen && (
            <PopoverWrapper ref={setPopperElement}>
              <ClickOutside onClickOutside={handleClickOutside}>
                <Animation {...animationProps} visible={open}>
                  <div>{content}</div>
                </Animation>
              </ClickOutside>
              {clonedArrow}
            </PopoverWrapper>
          )}
        </Portal>
      </>
    );
  }
);
