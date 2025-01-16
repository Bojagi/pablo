import { useTheme } from '@emotion/react';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { useComponentStyleContext } from './context';
import { parseSpacing } from '../styleHelpers';
export const useComponentStyle = (path: string, props: Record<string, any> = {}) => {
  const componentStyles = useComponentStyleContext();
  const theme = useTheme();
  return getComponentStyle(path)({ ...props, theme: { ...theme, componentStyles } });
};

export const useNumericComponentStyle = (path: string, props: Record<string, any> = {}): number => {
  return parseSpacing((useComponentStyle(path, props) as string) || '0');
};
