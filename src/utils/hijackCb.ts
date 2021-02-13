export function hijackCbBefore<F extends Function>(cb: F | undefined, hijackFn: () => void) {
  return (...args) => {
    hijackFn();
    if (cb) {
      return cb(...args);
    }
    return undefined;
  };
}

export function hijackCbAfter<F extends Function>(cb: F | undefined, hijackFn: () => void) {
  return (...args) => {
    let returnVal;
    if (cb) {
      returnVal = cb(...args);
    }
    hijackFn();
    return returnVal;
  };
}
