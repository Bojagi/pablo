import type { WithTheme } from '@emotion/react';
import { PabloTheme } from '../theme/types';
import { ComponentPath } from '../types';

const getStringPath = (path: string, props: object) =>
  path.replace(/\{(.*?)\}/g, (_, val) => props[val] || val).split('.');

const getArrayPath = <P extends object>(path: ComponentPath<P>, props: object) =>
  path.map((key) => {
    if (typeof key === 'function') {
      return key(props as P);
    }

    return key;
  });

export const getComponentStyle =
  <P extends object>(
    path: ComponentPath<P> | string,
    transformFn: (value: unknown) => string | number = (v) => v as string
  ) =>
  (props: WithTheme<any, PabloTheme>) => {
    const pathArray = Array.isArray(path) ? getArrayPath(path, props) : getStringPath(path, props);

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
