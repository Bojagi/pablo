import { useCallback, useLayoutEffect } from 'react';
import { type PositionMatch, reposition, type NanoPopPosition } from 'nanopop';

type InputElement<E = HTMLDivElement> = E | null;

interface UseNanopopOptions {
  targetWindow?: Window;
  referenceElement: InputElement<HTMLElement>;
  popperElement: InputElement;
  arrowElement?: InputElement;
  margin: number;
  position: NanoPopPosition;
  onChange?: (newPosition: PositionMatch | null) => void;
}

const useNanopop = ({
  targetWindow = window,
  referenceElement,
  popperElement,
  arrowElement,
  margin,
  position,
  onChange = () => {},
}: UseNanopopOptions) => {
  const repos = useCallback(() => {
    if (!referenceElement || !popperElement) {
      return;
    }

    const container = targetWindow.document.documentElement?.getBoundingClientRect();

    const newPlacement = reposition(referenceElement, popperElement, {
      margin,
      position,
      container,
      arrow: arrowElement || undefined,
    });

    onChange(newPlacement);
  }, [onChange, referenceElement, popperElement, targetWindow, margin, position, arrowElement]);

  useLayoutEffect(() => {
    repos();
    targetWindow.addEventListener('resize', repos);
    targetWindow.addEventListener('scroll', repos);

    return () => {
      targetWindow.removeEventListener('resize', repos);
      targetWindow.removeEventListener('scroll', repos);
    };
  }, [targetWindow, repos]);
};

export { useNanopop };
