import { ToastCardProps } from '../ToastCard';

export interface InternalToastMessageOptions extends ToastMessageOptions {
  hidden: boolean;
}

export type ToastStackSide = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface ToastMessageOptions extends ToastCardProps {
  id?: string;
  duration: number;
}
