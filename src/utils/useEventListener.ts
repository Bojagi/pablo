import { useEffect, useMemo } from 'react';

type EventListenerFn<E extends Event> = (event: E) => void;

const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: EventListenerFn<WindowEventMap[K]>,
  dependencies: any[] = [],
  element = window
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const savedHandler = useMemo(() => handler, [dependencies]);

  useEffect(() => {
    element.addEventListener(eventName, savedHandler);
    return () => {
      element.removeEventListener(eventName, savedHandler);
    };
  }, [eventName, element, savedHandler]);
};

export { useEventListener };
