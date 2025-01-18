const calculateFluidClamp = (
  minSize: number,
  maxSize: number,
  minWidth: number,
  maxWidth: number
) => {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yIntersection = -1 * minWidth * slope + minSize;
  return `clamp(${minSize}rem, ${yIntersection}rem + ${slope * 100}vw, ${maxSize}rem)`;
};

const ensureFluidTuple = (value: number | [number, number]) => {
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value];
};

export { calculateFluidClamp, ensureFluidTuple };
