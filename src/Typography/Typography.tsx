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
  font-family: ${themeVars.typography.base.fontFamily};
  font-style: normal;
  font-weight: ${themeVars.typography.base.fontWeight};
  margin: 0;
  ${getCustomStyles('typography.styles', 'root')(props)}
`;

export const Paragraph = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.paragraph.fontSize};
  font-weight: ${themeVars.typography.paragraph.fontWeight};
  line-height: ${themeVars.typography.paragraph.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.paragraph.marginBottom)};
  ${getCustomStyles('typography.styles', 'paragraph')}
  ${boxInterpolateFn}
  ${typography}
`;

export const ParagraphBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.paragraphBold.fontSize};
  line-height: ${themeVars.typography.paragraphBold.lineHeight};
  font-weight: ${themeVars.typography.paragraphBold.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.paragraphBold.marginBottom)};
  ${getCustomStyles('typography.styles', 'paragraphBold')}
  ${boxInterpolateFn}
  ${typography}
`;

export const ButtonTypography = styled.span<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.button.fontSize};
  font-weight: ${themeVars.typography.button.fontWeight};
  line-height: ${themeVars.typography.button.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.button.marginBottom)};
  ${getCustomStyles('typography.styles', 'button')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Headline = styled.h2<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.headline.fontSize};
  font-weight: ${themeVars.typography.headline.fontWeight};
  line-height: ${themeVars.typography.headline.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.headline.marginBottom)};
  ${getCustomStyles('typography.styles', 'headline')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Title = styled.h3<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.title.fontSize};
  line-height: ${themeVars.typography.title.lineHeight};
  font-weight: ${themeVars.typography.title.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.title.marginBottom)};
  ${getCustomStyles('typography.styles', 'title')}
  ${boxInterpolateFn}
  ${typography}
`;

export const Subtitle = styled.h4<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.subtitle.fontSize};
  line-height: ${themeVars.typography.subtitle.lineHeight};
  font-weight: ${themeVars.typography.subtitle.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.subtitle.marginBottom)};
  ${getCustomStyles('typography.styles', 'subtitle')}
  ${boxInterpolateFn}
  ${typography}
`;

export const InfoText = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.info.fontSize};
  line-height: ${themeVars.typography.info.lineHeight};
  font-weight: ${themeVars.typography.info.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.info.marginBottom)};
  ${getCustomStyles('typography.styles', 'info')}
  ${boxInterpolateFn}
  ${typography}
`;

export const InfoTextBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${themeVars.typography.infoBold.fontSize};
  line-height: ${themeVars.typography.infoBold.lineHeight};
  font-weight: ${themeVars.typography.infoBold.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : themeVars.typography.infoBold.marginBottom)};
  ${getCustomStyles('typography.styles', 'infoBold')}
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
