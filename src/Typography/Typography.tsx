import React from 'react';
import styled, { css } from 'styled-components';
import { boxInterpolateFn, BoxProps } from '../Box';

export type TypographyVariant =
  | 'headline'
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'paragraphBold'
  | 'button'
  | 'info'
  | 'infoBold';

export interface BaseTypographyProps extends BoxProps {
  inline?: boolean;
}
export interface TypographyProps extends BaseTypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
}

const baseTypographyStyle = css`
  font-family: ${(props) => props.theme.typography.base.fontFamily};
  font-style: normal;
  font-weight: ${(props) => props.theme.typography.base.fontWeight};
  margin: 0;
`;

export const Paragraph = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.paragraph.fontSize};
  line-height: ${(props) => props.theme.typography.paragraph.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.paragraph.marginBottom)};
  ${boxInterpolateFn}
`;

export const ParagraphBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.paragraphBold.fontSize};
  line-height: ${(props) => props.theme.typography.paragraphBold.lineHeight};
  font-weight: ${(props) => props.theme.typography.paragraphBold.fontWeight};
  margin-bottom: ${(props) =>
    props.inline ? 0 : props.theme.typography.paragraphBold.marginBottom};
  ${boxInterpolateFn}
`;

export const ButtonTypography = styled.span<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.button.fontSize};
  line-height: ${(props) => props.theme.typography.button.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.button.marginBottom)};
  ${boxInterpolateFn}
`;

export const Headline = styled.h2<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.headline.fontSize};
  line-height: ${(props) => props.theme.typography.headline.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.headline.marginBottom)};
  ${boxInterpolateFn}
`;

export const Title = styled.h3<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.title.fontSize};
  line-height: ${(props) => props.theme.typography.title.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.title.marginBottom)};
  ${boxInterpolateFn}
`;

export const Subtitle = styled.h4<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.subtitle.fontSize};
  line-height: ${(props) => props.theme.typography.subtitle.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.subtitle.marginBottom)};
  ${boxInterpolateFn}
`;

export const InfoText = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.info.fontSize};
  line-height: ${(props) => props.theme.typography.info.lineHeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.info.marginBottom)};
  ${boxInterpolateFn}
`;

export const InfoTextBold = styled.p<BaseTypographyProps>`
  ${baseTypographyStyle}
  font-size: ${(props) => props.theme.typography.infoBold.fontSize};
  line-height: ${(props) => props.theme.typography.infoBold.lineHeight};
  font-weight: ${(props) => props.theme.typography.infoBold.fontWeight};
  margin-bottom: ${(props) => (props.inline ? 0 : props.theme.typography.infoBold.marginBottom)};
  ${boxInterpolateFn}
`;

export const Typography = ({ variant = 'paragraph', children, ...props }: TypographyProps) => {
  switch (variant) {
    case 'headline':
      return <Headline {...props}>{children}</Headline>;
    case 'title':
      return <Title {...props}>{children}</Title>;
    case 'subtitle':
      return <Subtitle {...props}>{children}</Subtitle>;
    case 'paragraphBold':
      return <ParagraphBold {...props}>{children}</ParagraphBold>;
    case 'info':
      return <InfoText {...props}>{children}</InfoText>;
    case 'infoBold':
      return <InfoTextBold {...props}>{children}</InfoTextBold>;
    case 'button':
      return <ButtonTypography {...props}>{children}</ButtonTypography>;
    case 'paragraph':
    default:
      return <Paragraph {...props}>{children}</Paragraph>;
  }
};
