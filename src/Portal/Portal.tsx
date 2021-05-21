import { forwardRef, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { setRef } from '../utils/setRef';

export interface PortalProps {
  children: ReactNode;
  name: string;
}

export const Portal = forwardRef<unknown, PortalProps>(({ children, name }, ref) => {
  const [mountPoint, setMountPoint] = useState<Element | null>(null);
  useEffect(() => setMountPoint(document.createElement('div')), []);
  useEffect(() => {
    if (mountPoint) {
      setRef(ref, mountPoint);
      mountPoint.setAttribute('data-testid', `pbl-${name}-mountpoint`);
      document.body.appendChild(mountPoint);
      return () => {
        document.body.removeChild(mountPoint);
      };
    }
    return () => {};
  }, [name, mountPoint, ref]);

  if (!mountPoint) {
    return null;
  }

  return ReactDOM.createPortal(children, mountPoint);
});
