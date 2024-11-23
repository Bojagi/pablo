import { CssFunctionReturn } from '../types';
import { PabloThemeFull } from '../theme/types';

const interpolateCssProp = <T extends { theme: PabloThemeFull; css?: CssFunctionReturn<T> }>(
  props: T
) => {
  if (typeof props.css === 'function') {
    return props.css(props);
  }

  if (Array.isArray(props.css)) {
    return props.css.map((css) => (typeof css === 'function' ? css(props) : css));
  }

  return props.css;
};

export { interpolateCssProp };
