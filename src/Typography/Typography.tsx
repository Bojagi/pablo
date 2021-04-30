import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';
import { baseStyle } from '../shared/baseStyle';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { TypographyStyleProperties } from './styles';
import { TypographyVariant } from './types';

export interface BaseTypographyProps extends BoxProps, BaseProps<TypographyStyleProperties> {
  inline?: boolean;
}
export interface TypographyProps extends BaseTypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
}

const baseTypographyStyle = css<BaseTypographyProps>`
  ${baseStyle}
  font-family: ${(props) => props.theme.typography.base.fontFamily};
  font-style: normal;
  font-weight: ${(props) => props.theme.typography.base.fontWeight};
  margin: 0;
  ${getCustomStyles('typography.styles', 'root')}
`;

export const Paragraph = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.paragraph.fontSize};
  line-height: ${(props) => props.theme.typography.paragraph.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.paragraph.marginBottom)};
  ${getCustomStyles('typography.styles', 'paragraph')}
  ${boxInterpolateFn}
`;

export const ParagraphBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.paragraphBold.fontSize};
  line-height: ${(props) => props.theme.typography.paragraphBold.lineHeight};
  font-weight: ${(props) => props.theme.typography.paragraphBold.fontWeight};
  margin-bottom: ${(props) =>
    props.inline ? 0 : props.theme.typography.paragraphBold.marginBottom};
  ${getCustomStyles('typography.styles', 'paragraphBold')}
  ${boxInterpolateFn}
`;

export const ButtonTypography = styled.span<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.button.fontSize};
  line-height: ${(props) => props.theme.typography.button.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.button.marginBottom)};
  ${getCustomStyles('typography.styles', 'button')}
  ${boxInterpolateFn}
`;

export const Headline = styled.h2<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.headline.fontSize};
  line-height: ${(props) => props.theme.typography.headline.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.headline.marginBottom)};
  ${getCustomStyles('typography.styles', 'headline')}
  ${boxInterpolateFn}
`;

export const Title = styled.h3<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.title.fontSize};
  line-height: ${(props) => props.theme.typography.title.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.title.marginBottom)};
  ${getCustomStyles('typography.styles', 'title')}
  ${boxInterpolateFn}
`;

export const Subtitle = styled.h4<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.subtitle.fontSize};
  line-height: ${(props) => props.theme.typography.subtitle.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.subtitle.marginBottom)};
  ${getCustomStyles('typography.styles', 'subtitle')}
  ${boxInterpolateFn}
`;

export const InfoText = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.info.fontSize};
  line-height: ${(props) => props.theme.typography.info.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.info.marginBottom)};
  ${getCustomStyles('typography.styles', 'info')}
  ${boxInterpolateFn}
`;

export const InfoTextBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.infoBold.fontSize};
  line-height: ${(props) => props.theme.typography.infoBold.lineHeight};
  font-weight: ${(props) => props.theme.typography.infoBold.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.infoBold.marginBottom)};
  ${getCustomStyles('typography.styles', 'infoBold')}
  ${boxInterpolateFn}
`;

export const Typography = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Paragraph>
>(({ variant = 'paragraph', children, ...props }, ref) => {
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
});
