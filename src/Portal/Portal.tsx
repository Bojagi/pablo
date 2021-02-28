import { forwardRef, ReactNode, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { setRef } from '../utils/setRef';

export interface PortalProps {
  children: ReactNode;
  name: string;
}

export const Portal = forwardRef<unknown, PortalProps>(({ children, name }, ref) => {
  const mountPoint = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    setRef(ref, mountPoint);
    mountPoint.setAttribute('data-testid', `pbl-${name}-mountpoint`);
    document.body.appendChild(mountPoint);
    return () => {
      document.body.removeChild(mountPoint);
    };
  }, [name, mountPoint, ref]);

  return ReactDOM.createPortal(children, mountPoint);
});
