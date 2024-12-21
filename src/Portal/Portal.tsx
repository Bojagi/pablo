import { forwardRef, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { setRef } from '../utils/setRef';
import { rootContext } from '../theme';

export interface PortalProps {
  children: ReactNode;
  name: string;
}

export const Portal = forwardRef<unknown, PortalProps>(({ children, name }, ref) => {
  const [mountPoint, setMountPoint] = useState<Element | null>(null);
  const rootElement = useContext(rootContext);
  useEffect(() => setMountPoint(document.createElement('div')), []);
  useEffect(() => {
    const root = rootElement || document;
    if (mountPoint) {
      mountPoint.setAttribute('data-testid', `pbl-${name}-mountpoint`);
      const mountPointParent = root instanceof ShadowRoot ? root : root.body;
      mountPointParent.appendChild(mountPoint);
      setRef(ref, mountPoint);
      return () => {
        mountPointParent.removeChild(mountPoint);
      };
    }
    return () => {};
  }, [name, mountPoint, ref, rootElement]);

  if (!mountPoint) {
    return null;
  }

  return createPortal(children, mountPoint);
});
