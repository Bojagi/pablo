import type { WithTheme } from '@emotion/react';
import { PabloTheme } from '../theme/types';
import { ComponentPath } from '../types';

type FunctionPath<P extends object> = (props: P) => ComponentPath;

export const getComponentStyle =
  <P extends object>(
    path: FunctionPath<P> | ComponentPath,
    transformFn: (value: unknown) => string | number = (v) => v as string
  ) =>
  (props: WithTheme<P, PabloTheme>) => {
    const pathArray = typeof path === 'function' ? path(props) : path;

    const value = pathArray.reduce(
      (acc, key) => (acc && acc[key]) || undefined,
      props.theme.componentStyles || {}
    );

    if (typeof value === 'function') {
      return transformFn(value(props));
    }

    return transformFn(value);
  };

export const transitionTransformer = (transitions: string[][] = []) =>
  transitions.map((param) => param.join(' ')).join(', ');

export const shadowTransformer = (shadows: string[] = []) => shadows.join(', ');
