import { Ref, useEffect, useMemo, useState } from 'react';
import { setRef } from './setRef';

export function useForwardRef<T>(outsideRef: Ref<T>): [T | null, (newValue: T) => void] {
  const [innerRef, setInnerRef] = useState<T | null>(null);
  useEffect(() => {
    if (innerRef) {
      setRef(outsideRef, innerRef);
    }
  }, [innerRef, outsideRef]);

  return useMemo(() => [innerRef, setInnerRef], [innerRef, setInnerRef]);
}
