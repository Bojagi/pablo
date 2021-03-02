import React, {
  ComponentElement,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import styled from 'styled-components';
import { Portal } from '../Portal/Portal';
import { ClickOutside } from '../ClickOutside/ClickOutside';
import { setRef } from '../utils/setRef';
import { useForwardRef } from '../utils/useForwardRef';

export interface PopoverProps {
  children: ComponentElement<any, any>;
  content: ReactNode;
  placement: Placement;
  offset?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickOutside?: () => void;
  arrow?: ReactElement;
  open: boolean;
}

const PopoverWrapper = styled.div`
  z-index: 1100;
`;

export const Popover = forwardRef(
  (
    {
      children,
      content,
      placement,
      open,
      offset = 0,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
      onClickOutside = () => {},
      arrow = <div />,
    }: PopoverProps,
    ref
  ) => {
    const [referenceElement, setReferenceElement] = useForwardRef<HTMLElement | null>(
      children.ref as Ref<HTMLElement>
    );
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

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

    const handleClickOutside = React.useMemo(() => (open ? onClickOutside : () => {}), [
      open,
      onClickOutside,
    ]);

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
        }),
      [children, setReferenceElement]
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
          {open && (
            <PopoverWrapper ref={setPopperElement} style={styles.popper} {...attributes.popper}>
              <ClickOutside onClickOutside={handleClickOutside}>
                <div>{content}</div>
              </ClickOutside>
              {clonedArrow}
            </PopoverWrapper>
          )}
        </Portal>
      </>
    );
  }
);
