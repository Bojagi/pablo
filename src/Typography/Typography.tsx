import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { boxInterpolateFn, BoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { TypographyStyleProperties } from './styles';
import { TypographyVariant } from './types';
import { themeVars } from '../theme/themeVars';
import { typography, TypographyInterpolationProps } from '../Box/interpolations/typography';
import { ifProp } from '../styleHelpers/styleProp';

export interface BaseTypographyProps
  extends BoxProps,
    BaseProps<TypographyStyleProperties>,
    TypographyInterpolationProps {
  inline?: boolean;
}
export interface TypographyProps extends BaseTypographyProps {
  variant: TypographyVariant;
  as?: React.ElementType;
  htmlFor?: string;
  children: React.ReactNode;
}

const baseTypographyStyle = (props: BaseTypographyProps) => css`
  ${baseStyle}
  ${themeVars.typography.base};
  font-style: normal;
  margin: 0;
  ${getCustomStyles('typography.styles', 'root')(props)}
`;

const additionalTypographyStyles = (type: string) => (props: BaseTypographyProps) => {
  return css`
    ${getCustomStyles('typography.styles', type)(props)}
    ${ifProp('inline', 'margin-bottom: 0;')(props as any)}
    ${boxInterpolateFn(props)}
    ${typography(props as any)}
  `;
};

export const Paragraph = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.paragraph};
  ${additionalTypographyStyles('paragraph')}
`;

export const ParagraphBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.paragraphBold}
  ${additionalTypographyStyles('paragraphBold')}
  ${boxInterpolateFn}
  ${typography}
`;

export const ButtonTypography = styled.span<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.button};
  ${additionalTypographyStyles('button')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Headline = styled.h2<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.headline}
  ${additionalTypographyStyles('headline')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Title = styled.h3<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.title}
  ${additionalTypographyStyles('title')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Subtitle = styled.h4<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.subtitle}
  ${additionalTypographyStyles('subtitle')}
  ${boxInterpolateFn}
  ${typography}
`;

export const InfoText = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.info}
  ${additionalTypographyStyles('info')}
  ${boxInterpolateFn}
  ${typography}
`;

export const InfoTextBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  ${themeVars.typography.infoBold}
  ${additionalTypographyStyles('infoBold')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ variant = 'paragraph', children, ...props }, ref) => {
    switch (variant) {
      case 'headline':
        return (
          <Headline ref={ref} {...props}>
            {children}
          </Headline>
        );
      case 'title':
        return (
          <Title ref={ref} {...props}>
            {children}
          </Title>
        );
      case 'subtitle':
        return (
          <Subtitle ref={ref} {...props}>
            {children}
          </Subtitle>
        );
      case 'paragraphBold':
        return (
          <ParagraphBold ref={ref} {...props}>
            {children}
          </ParagraphBold>
        );
      case 'info':
        return (
          <InfoText ref={ref} {...props}>
            {children}
          </InfoText>
        );
      case 'infoBold':
        return (
          <InfoTextBold ref={ref} {...props}>
            {children}
          </InfoTextBold>
        );
      case 'button':
        return (
          <ButtonTypography ref={ref} {...props}>
            {children}
          </ButtonTypography>
        );
      case 'paragraph':
      default:
        return (
          <Paragraph ref={ref} {...props}>
            {children}
          </Paragraph>
        );
    }
  }
);
