import { MutableRefObject, Ref, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { setRef } from './setRef';

export function useForwardRef<T>(outsideRef: Ref<T>): [RefObject<T>, (newValue: T) => void] {
  const innerRef = useRef<T>(null);
  const setInnerRef = useCallback(
    (value) => {
      (innerRef as MutableRefObject<T>).current = value;
      setRef(outsideRef, value);
    },
    [outsideRef]
  );

  return useMemo(() => [innerRef, setInnerRef], [innerRef, setInnerRef]);
}

export function useReRenderForwardRef<T>(outsideRef: Ref<T>): [T | null, (newValue: T) => void] {
  const [innerRef, setInnerRefValue] = useState(null);
  const setInnerRef = useCallback(
    (value) => {
      setInnerRefValue(value);
      setRef(outsideRef, value);
    },
    [outsideRef]
  );

  return useMemo(() => [innerRef, setInnerRef], [innerRef, setInnerRef]);
}
