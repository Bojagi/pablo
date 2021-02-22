import { InternalToastMessageOptions, ToastMessageOptions } from './types';

interface AddToastAction {
  type: 'add';
  message: ToastMessageOptions;
}

interface HideToastAction {
  type: 'hide';
  id: string;
}

interface RemoveToastAction {
  type: 'remove';
  id: string;
}

export function toastMessageReducer(
  state: InternalToastMessageOptions[],
  action: AddToastAction | RemoveToastAction | HideToastAction
) {
  switch (action.type) {
    case 'add':
      return addMessage(state, action.message);
    case 'hide':
      return hideMessage(state, action.id);
    case 'remove':
      return removeMessage(state, action.id);
    default:
      throw new Error();
  }
}

function addMessage(state: InternalToastMessageOptions[], message: ToastMessageOptions) {
  return [
    ...state,
    {
      ...message,
      hidden: false,
    },
  ];
}

function hideMessage(state: InternalToastMessageOptions[], id: string) {
  const indexToHide = state.findIndex((item) => item.id === id);
  const messages = [...state];
  const updatedMessage: InternalToastMessageOptions = {
    ...messages[indexToHide],
    hidden: true,
  };
  messages.splice(indexToHide, 1, updatedMessage);
  return messages;
}

function removeMessage(state: InternalToastMessageOptions[], id: string) {
  const indexToDelete = state.findIndex((item) => item.id === id);
  const messages = [...state];
  messages.splice(indexToDelete, 1);
  return messages;
}
