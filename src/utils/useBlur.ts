import { useEffect, useRef } from 'react';

const useBlur = (handler: (target: HTMLElement | null) => void) => {
  const clickedElement = useRef<HTMLElement | null>(null);
  const handleMouseDown = (e: MouseEvent) => {
    clickedElement.current = e.target as HTMLElement;
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return () => {
    const target = clickedElement.current;
    clickedElement.current = null;

    handler(target);
  };
};

export { useBlur };
