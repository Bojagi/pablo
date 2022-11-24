import { registerComponentStyles } from '../theme/defaultComponentStyles';
import { BaseStyles } from '../types';

export type ImageStyleProperties = 'root';

export interface ImageStyles extends BaseStyles<ImageStyleProperties> {}

export const imageStyles: ImageStyles = {};

registerComponentStyles('image', imageStyles);
