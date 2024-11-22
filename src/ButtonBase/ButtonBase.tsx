import { layoutInterpolationFn, LayoutBoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle, transitionTransformer } from '../styleHelpers/getComponentStyle';
import { omit } from '../utils/omit';

export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonBaseProps extends LayoutBoxProps {
  size?: ButtonSize;
  onClick?: () => void;
}

export const buttonBaseStyles: any = [
  (props) => ({
    ...baseStyle,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
    padding: getComponentStyle('button.sizes.{size}.padding')(props),
    border: `${getComponentStyle('button.base.borderSize')(props)}px solid transparent`,
    background: 'transparent',
    borderRadius: getComponentStyle('button.base.borderRadius')(props),
    transition: getComponentStyle('button.base.transitions', transitionTransformer)(props),
    outline: 'none',

    '&:enabled': {
      cursor: 'pointer',
    },

    '&:disabled': {
      opacity: getComponentStyle('button.base.disabled.opacity')(props),
      cursor: 'normal',
    },
  }),
  (props: any) => layoutInterpolationFn(omit(props, ['size'])),
];
