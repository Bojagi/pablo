import React, { ReactNode, useReducer, createContext, useContext, useCallback } from 'react';
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

const addMessageContext = createContext<AddMessageFunction>(() => {});

export function useToast() {
  const addToast = useContext(addMessageContext);
  return { addToast };
}

export interface ToastProviderProps {
  side?: ToastStackSide;
  children: ReactNode;
}

export function ToastProvider({ children, side = 'bottom-right' }: ToastProviderProps) {
  const [messages, dispatchMessage] = useReducer(toastMessageReducer, []);
  const mountedRef = useMountedRef();

  const addMessage = useCallback((message: ToastMessageOptions) => {
    dispatchMessage({
      type: 'add',
      message,
    });
  }, []);

  const removeMessage = useCallback(
    (id: string) => {
      if (mountedRef.current) {
        dispatchMessage({
          type: 'remove',
          id,
        });
      }
    },
    [mountedRef]
  );

  const hideMessage = useCallback(
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

  const handleAddMessage = useCallback(
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
                  mb={1.5}
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
