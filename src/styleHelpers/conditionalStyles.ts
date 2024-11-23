import type { WithTheme } from '@emotion/react';
import { PabloTheme } from '../theme/types';
import type { CSSInterpolation } from '@emotion/serialize';

type StyleMap<P extends Record<string, any>, PK extends keyof P = keyof P> = Record<
  P[PK],
  CSSInterpolation | ((props: WithTheme<P, PabloTheme>) => CSSInterpolation)
>;

export function conditionalStyles<P extends Record<string, any>, PK extends keyof P = keyof P>(
  propKey: PK,
  styleMap: StyleMap<P, PK> | ((props: P) => StyleMap<P, PK>)
) {
  return (props: WithTheme<P, PabloTheme>): CSSInterpolation => {
    const style = typeof styleMap === 'function' ? styleMap(props) : styleMap;

    const mapValue = style[props[propKey]];
    if (typeof mapValue === 'function') {
      return mapValue(props);
    }

    return mapValue;
  };
}
