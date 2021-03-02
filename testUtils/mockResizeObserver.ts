export const resizeObserverCallbacks: any[] = [];
export const resizeObserverElements: any[] = [];

/* eslint-disable class-methods-use-this */
class ResizeObserver {
  constructor(cb: any) {
    resizeObserverCallbacks.push(cb);
  }

  observe(elem) {
    resizeObserverElements.push(elem);
  }

  unobserve() {}
}

export function cleanupResizeObserver() {
  resizeObserverCallbacks.splice(0, resizeObserverCallbacks.length);
  resizeObserverElements.splice(0, resizeObserverElements.length);
}

(window as any).ResizeObserver = ResizeObserver;
export default ResizeObserver;
