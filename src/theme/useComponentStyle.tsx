import { useTheme } from '@emotion/react';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { useComponentStyleContext } from './context';

export const useComponentStyle = (path: string, props: Record<string, any> = {}) => {
  const componentStyles = useComponentStyleContext();
  const theme = useTheme();
  return getComponentStyle(path)({ ...props, theme: { ...theme, componentStyles } });
};
