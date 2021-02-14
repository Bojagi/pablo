import { css, FlattenSimpleInterpolation } from 'styled-components';
import { PabloThemeableProps, Style } from '../theme/types';

export type PPlusThemeable<P> = P & PabloThemeableProps;

export type StyleProp<PropName, P> =
  | [
      propName: PropName,
      cssAttribute: string,
      transformFn?: (value: any, props: PPlusThemeable<P>) => Style
    ]
  | [propName: PropName, interpolationResult: FlattenSimpleInterpolation];

export function interpolateFnFactory<P extends Record<string, any>, PK = keyof PPlusThemeable<P>>(
  ...styleProps: StyleProp<PK, P>[]
) {
  return (props) =>
    styleProps
      .filter(([propName]) => !!props[propName])
      .map(([propName, cssAttribute, transformFn]) =>
        typeof cssAttribute === 'string'
          ? css`
              ${cssAttribute}: ${transformFn
                ? transformFn(props[propName], props)
                : props[propName]};
            `
          : cssAttribute
      );
}
