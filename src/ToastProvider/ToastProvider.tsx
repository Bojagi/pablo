import React, { ReactNode, useReducer } from 'react';
import { Box } from '../Box';
import { ToastCard } from '../ToastCard';
import { createUniqueId } from '../utils/useUniqueId';
import { StackAnimation } from '../animation/StackAnimation';
import { toastMessageReducer } from './toastMessageReducer';
import { ToastStack } from './ToastStack';
import { ToastMessageOptions, ToastStackSide } from './types';
import { useMountedRef } from '../utils/useMountedRef';

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
  const mountedRef = useMountedRef();

  const addMessage = React.useCallback((message: ToastMessageOptions) => {
    dispatchMessage({
      type: 'add',
      message,
    });
  }, []);

  const removeMessage = React.useCallback(
    (id: string) => {
      console.log('xxxxxx');

      if (mountedRef.current) {
        dispatchMessage({
          type: 'remove',
          id,
        });
      }
    },
    [mountedRef]
  );

  const hideMessage = React.useCallback(
    (id: string) => {
      if (mountedRef.current) {
        dispatchMessage({
          type: 'hide',
          id,
        });
      }
    },
    [mountedRef]
  );

  const handleAddMessage = React.useCallback(
    (messageOptions: ToastMessageOptions) => {
      const id = messageOptions.id || createUniqueId('toast-message');
      const duration =
        messageOptions.duration || messageOptions.duration === 0
          ? messageOptions.duration
          : DEFAULT_DURATION;
      if (duration) {
        setTimeout(() => hideMessage(id), duration);
      }
      addMessage({
        ...messageOptions,
        closable: !duration ? true : messageOptions.closable,
        id,
      });
    },
    [hideMessage, addMessage]
  );

  return (
    <>
      <addMessageContext.Provider value={handleAddMessage}>{children}</addMessageContext.Provider>
      <ToastStack side={side}>
        {messages.map(({ hidden, ...message }, i, arr) => {
          const isAlert = message.type === 'warning' || message.type === 'error';
          return (
            <Box key={message.id} zIndex={100 + arr.length - i}>
              <StackAnimation
                duration={FADE_DURATION}
                visible={!hidden}
                onExited={() => removeMessage(message.id!)}
              >
                <ToastCard
                  aria-live={isAlert ? 'assertive' : 'polite'}
                  role={isAlert ? 'alert' : 'status'}
                  aria-atomic="true"
                  {...message}
                  mb={4}
                  onClose={() => hideMessage(message.id!)}
                />
              </StackAnimation>
            </Box>
          );
        })}
      </ToastStack>
    </>
  );
}
