import { css, FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { PabloThemeableProps, Style } from '../theme/types';
import { isDefined } from '../utils/isDefined';

export type PPlusThemeable<P> = P & PabloThemeableProps;

export type StyleProp<PropName, P> =
  | [
      propName: PropName,
      cssAttribute: string | string[],
      transformFn?: (value: any, props: PPlusThemeable<P>) => Style
    ]
  | [
      propName: PropName,
      interpolationFn: (props: P) => FlattenSimpleInterpolation | FlattenInterpolation<any>
    ];

export function interpolateFnFactory<P extends Record<string, any>, PK = keyof PPlusThemeable<P>>(
  ...styleProps: StyleProp<PK, P>[]
) {
  return (props) =>
    styleProps.filter(([propName]) => isDefined(props[propName])).map(mapStyle<P, PK>(props));
}

function mapStyle<P extends Record<string, any>, PK = keyof PPlusThemeable<P>>(props) {
  return ([propName, cssAttribute, transformFn]: StyleProp<PK, P>) => {
    if (typeof cssAttribute === 'function') {
      return cssAttribute(props);
    }

    if (Array.isArray(cssAttribute)) {
      return cssAttribute.map((attribute) =>
        mapKeyValueStyle(props, propName, attribute, transformFn)
      );
    }

    return mapKeyValueStyle(props, propName, cssAttribute, transformFn);
  };
}

function mapKeyValueStyle(
  props: any,
  propName: any,
  cssAttribute: string,
  transformFn?: (value: any, transformProps: any) => Style
) {
  return css`
    ${cssAttribute}: ${transformFn
      ? (() => transformFn(props[propName], props))()
      : props[propName]};
  `;
}
