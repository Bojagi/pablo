const defaultComponentStyles = {};

export function registerComponentStyles(name: string, styles: any) {
  if (defaultComponentStyles[name]) {
    return undefined;
  }

  defaultComponentStyles[name] = styles;

  return styles;
}

export function getDefaultComponentStyles() {
  return { ...defaultComponentStyles };
}
