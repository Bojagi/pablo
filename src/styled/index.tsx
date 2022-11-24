import { ComponentType } from 'react';
import sc from 'styled-components';

type StyleFn<P extends Record<string, any>> = (props: P & { theme: any }) => Record<string, any>;

type Styles<P extends Record<string, any>> =
  | StyleFn<P>
  | Array<StyleFn<P> | string>
  | Record<string, any>;

export const styled = <P extends Record<string, any>>(Component) => (
  styles: Styles<P>
): ComponentType<P> =>
  (sc(Component)`${styles}
    ${(props) => props.cssStyles}` as unknown) as ComponentType<P>;
