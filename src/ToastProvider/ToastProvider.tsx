import React, { ReactNode, useReducer } from 'react';
import { Box } from '../Box';
import { ToastCard } from '../ToastCard';
import { createUniqueId } from '../utils/useUniqueId';
import { StackAnimation } from '../animation/StackAnimation';
import { toastMessageReducer } from './toastMessageReducer';
import { ToastStack } from './ToastStack';
import { ToastMessageOptions, ToastStackSide } from './types';

const DEFAULT_DURATION = 3000;
export const FADE_DURATION = 300;

export type AddMessageFunction = (messageOptions: ToastMessageOptions) => void;

const addMessageContext = React.createContext<AddMessageFunction>(() => {});

export function useToast() {
  const addToast = React.useContext(addMessageContext);
  return { addToast };
}

export interface ToastProviderProps {
  side?: ToastStackSide;
  children: ReactNode;
}

export function ToastProvider({ children, side = 'bottom-right' }: ToastProviderProps) {
  const [messages, dispatchMessage] = useReducer(toastMessageReducer, []);

  const addMessage = React.useCallback(
    (message: ToastMessageOptions) =>
      dispatchMessage({
        type: 'add',
        message,
      }),
    []
  );

  const removeMessage = React.useCallback((id: string) => {
    dispatchMessage({
      type: 'remove',
      id,
    });
  }, []);

  const hideMessage = React.useCallback((id: string) => {
    dispatchMessage({
      type: 'hide',
      id,
    });
  }, []);

  const handleAddMessage = React.useCallback(
    (messageOptions: ToastMessageOptions) => {
      const id = messageOptions.id || createUniqueId('toast-message');
      const duration = messageOptions.duration ?? DEFAULT_DURATION;
      if (duration) {
        setTimeout(() => hideMessage(id), duration);
      }
      addMessage({
        ...messageOptions,
        id,
      });
    },
    [hideMessage, addMessage]
  );

  return (
    <>
      <addMessageContext.Provider value={handleAddMessage}>{children}</addMessageContext.Provider>
      <ToastStack side={side}>
        {messages.map(({ hidden, ...message }, i, arr) => (
          <Box key={message.id} zIndex={arr.length - i}>
            <StackAnimation
              duration={FADE_DURATION}
              visible={!hidden}
              onExited={() => removeMessage(message.id!)}
            >
              <ToastCard {...message} mb={1} onClose={() => hideMessage(message.id!)} />
            </StackAnimation>
          </Box>
        ))}
      </ToastStack>
    </>
  );
}
