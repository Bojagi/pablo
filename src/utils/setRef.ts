import { MutableRefObject, Ref } from 'react';

export function setRef<T>(ref: Ref<T>, item: T) {
  if (typeof ref === 'function') {
    ref(item);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    (ref as MutableRefObject<T>).current = item;
  }
}
