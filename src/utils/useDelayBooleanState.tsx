import React, { useMemo } from 'react';

/**
 * Boolean state with delayed applied "true" value.
 * When value is "true", setting the value will be delayed by the defined delay time.
 * When the value is "false" it will be set directly (and "true" delay is cancelled).
 * @param initialValue Initial value of this state
 * @param delay delay time for setting state to "true" (in ms)
 */
export function useDelayedBooleanState(
  initialValue: boolean,
  delayIn: number,
  delayOut: number = 0
): [boolean, (newValue: boolean) => void] {
  const [outputState, setOutputState] = React.useState<boolean>(initialValue);
  const [inputState, setInputState] = React.useState<boolean>(initialValue);

  React.useEffect(() => {
    // Do nothing if input and output state match (e.g. initial true value)
    if (inputState === outputState) {
      return () => {};
    }

    if (!inputState) {
      const delayTimeout = setTimeout(() => {
        setOutputState(inputState);
      }, delayOut);
      return () => {
        clearTimeout(delayTimeout);
      };
    }

    const delayTimeout = setTimeout(() => {
      setOutputState(inputState);
    }, delayIn);
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delayIn, delayOut, outputState, inputState]);

  return useMemo(() => [outputState, setInputState], [outputState]);
}
