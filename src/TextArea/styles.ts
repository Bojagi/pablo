import { inputBaseStyles, InputBaseStyles } from '../shared/inputBaseStyles';

export interface TextAreaStyles extends InputBaseStyles {
  defaultRows: number;
}

export const textareaStyles: TextAreaStyles = {
  ...inputBaseStyles,
  defaultWidth: 500,
  defaultRows: 3,
};

console.log('textareaStyles', textareaStyles);
