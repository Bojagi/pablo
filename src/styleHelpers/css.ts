import { css, type Interpolation } from '@emotion/react';
import { interpolateStyles } from './interpolateStyles';

const pabloCss =
  <P extends object>(templates: TemplateStringsArray, ...styles: Interpolation<P>[]) =>
  (props) =>
    css(templates, ...interpolateStyles(styles, props));

export { pabloCss };
