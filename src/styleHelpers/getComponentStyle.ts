export const getComponentStyle = (
  path: string,
  transformFn: (value: unknown) => string | number = (v) => v as string
) => ({ theme, ...props }) => {
  const interpolatedPath = path.replace(/\{(.*?)\}/g, (_, val) => props[val] || val);

  const value = interpolatedPath
    .split('.')
    .reduce((acc, key) => (acc && acc[key]) || undefined, theme.componentStyles || {});
  console.log('value', path, value);

  if (typeof value === 'function') {
    return transformFn(value({ theme }));
  }

  return transformFn(value);
};

export const transitionTransformer = (transitions: string[][] = []) => {
  console.log('transitions', transitions);

  return transitions.map((param) => param.join(' ')).join(', ');
};

export const shadowTransformer = (shadows: string[] = []) => shadows.join(', ');
