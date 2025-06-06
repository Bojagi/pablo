import { MutableRefObject, Ref } from 'react';

export function setRef<T>(ref: Ref<T>, item: T, onSet?: (item: T) => void) {
  if (onSet) {
    onSet(item);
  }
  if (typeof ref === 'function') {
    ref(item);
  } else if (ref) {
    (ref as MutableRefObject<T>).current = item;
  }
}
