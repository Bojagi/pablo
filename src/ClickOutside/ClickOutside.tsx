import React, { cloneElement, ReactElement, useEffect, useMemo, useState } from 'react';

export interface ClickOutsideProps {
  children: ReactElement;
  onClickOutside: () => void;
}

export const ClickOutside = ({ children, onClickOutside }: ClickOutsideProps) => {
  const [elem, setElem] = useState(null);

  useEffect(() => {
    if (!elem) {
      return () => {};
    }

    const listener = (e) => {
      let targetEl = e.target; // clicked element
      do {
        if (targetEl === elem) {
          return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
      } while (targetEl);
      // This is a click outside.

      onClickOutside();
    };

    // Wait a tick, otherwise an opening click event will be directly triggering outside click as well
    setTimeout(() => document.addEventListener('click', listener));

    return () => {
      // Wait a tick here as well because adding the listener also waits a tick
      setTimeout(() => document.removeEventListener('click', listener));
    };
  }, [elem, onClickOutside]);

  const clonedChild = useMemo(
    () =>
      cloneElement(children, {
        ref: setElem,
      }),
    [children]
  );

  return <>{clonedChild}</>;
};
