import React from 'react';

/**
 * Boolean state with delayed applied "true" value.
 * When value is "true", setting the value will be delayed by the defined delay time.
 * When the value is "false" it will be set directly (and "true" delay is cancelled).
 * @param initialValue Initial value of this state
 * @param delay delay time for setting state to "true" (in ms)
 */
export function useDelayedBooleanState(
  initialValue: boolean,
  delay: number
): [boolean, (newValue: boolean) => void] {
  const [outputState, setOutputState] = React.useState<boolean>(initialValue);
  const [inputState, setInputState] = React.useState<boolean>(initialValue);

  React.useEffect(() => {
    if (!inputState) {
      setOutputState(inputState);
      return () => {};
    }

    const delayTimeout = setTimeout(() => {
      setOutputState(inputState);
    }, delay);
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delay, inputState]);

  return [outputState, setInputState];
}
