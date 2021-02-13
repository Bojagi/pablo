export function interpolateSize(size: string | number) {
  return typeof size === 'string' ? size : `${size}px`;
}
