import { inputBaseStyles, InputBaseStyles } from '../theme/baseStyles/inputBaseStyles';

export interface TextAreaStyles extends InputBaseStyles {
  defaultRows: number;
}

export const textareaStyles: TextAreaStyles = {
  ...inputBaseStyles,
  defaultWidth: 500,
  defaultRows: 3,
};
