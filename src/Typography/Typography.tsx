import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { boxInterpolateFn, BoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { TypographyStyleProperties } from './styles';
import { themeVars } from '../theme/themeVars';
import { typography, TypographyInterpolationProps } from '../Box/interpolations/typography';
import { ifProp } from '../styleHelpers/styleProp';
import type { TypographyVariants } from '../theme/typography';

export interface BaseTypographyProps
  extends BoxProps,
    BaseProps<TypographyStyleProperties>,
    TypographyInterpolationProps {
  inline?: boolean;
  id?: string;
  as?: React.ElementType;
  htmlFor?: string;
  children: React.ReactNode;
}

interface TypographyBodyProps extends BaseTypographyProps {
  bold?: boolean;
  small?: boolean;
}

interface TypographyButtonProps extends BaseTypographyProps {
  small?: boolean;
}

export type TypographyProps =
  | (BaseTypographyProps & {
      variant?: TypographyVariants;
    })
  | (TypographyBodyProps & {
      variant: 'body';
    })
  | (TypographyButtonProps & {
      variant: 'button';
    })
  | (TypographyBodyProps & {
      variant: undefined;
    });

const getTypographyStyles = (type: TypographyVariants, tag: keyof JSX.IntrinsicElements) => styled(
  tag
)<BaseTypographyProps | TypographyBodyProps | TypographyButtonProps>`
  ${baseStyle}
  ${themeVars.typography.base};
  font-style: normal;
  margin: 0;
  ${getCustomStyles('typography.styles', 'root')}
  ${themeVars.typography[type]};
  ${getCustomStyles('typography.styles', type)}
  ${ifProp('inline', 'margin-bottom: 0;')}
  ${ifProp('bold' as any, (themeVars.typography[type] as any).variants?.bold)}
  ${ifProp('small' as any, (themeVars.typography[type] as any).variants?.small)}
  ${typography}
  ${boxInterpolateFn}
`;

const typographyComponents = {
  h1: getTypographyStyles('h1', 'h1'),
  h2: getTypographyStyles('h2', 'h2'),
  h3: getTypographyStyles('h3', 'h3'),
  h4: getTypographyStyles('h4', 'h4'),
  body: getTypographyStyles('body', 'p'),
  button: getTypographyStyles('button', 'p'),
};

export const H1 = typographyComponents.h1;
export const Display = H1;
const H2 = typographyComponents.h2;
export const Headline = H2;
export const H3 = typographyComponents.h3;
export const Title = H3;
export const H4 = typographyComponents.h4;
export const Subtitle = H4;
export const Body = typographyComponents.body;
export const Paragraph = Body;
export const InfoText = (props: Omit<TypographyBodyProps, 'small'>) => <Body {...props} small />;

export const Typography = forwardRef(
  (
    { variant = 'body', children, ...props }: TypographyProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = typographyComponents[variant] || typographyComponents.body;
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
