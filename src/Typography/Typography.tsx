import React from "react";
import styled, { css } from "styled-components";
import { boxInterpolateFn, BoxProps } from "../Box";

export type TypographyVariant = 'headline' | 'title' | 'subtitle' | 'paragraph' | 'paragraphBold' | 'button' | 'info' | 'infoBold';

export interface TypographyProps extends BoxProps {
 variant: TypographyVariant;
 children: React.ReactNode;
};

const baseTypographyStyle = css`
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  margin: 0;
`;

export const Paragraph = styled.p`
  ${baseTypographyStyle}
  font-size: 14px;
  line-height: 20px;
  ${boxInterpolateFn}
`;

export const ParagraphBold = styled(Paragraph)`
  font-weight: 500;
  ${boxInterpolateFn}
`;

export const ButtonTypography = styled.span`
  ${baseTypographyStyle}
  font-size: 14px;
  line-height: 18px;
  ${boxInterpolateFn}
`;

export const Headline = styled.h2`
  ${baseTypographyStyle}
  font-size: 28px;
  line-height: 36px;
  margin: 0;
  ${boxInterpolateFn}
`;

export const Title = styled.h3`
  ${baseTypographyStyle}
  font-size: 24px;
  line-height: 31px;
  ${boxInterpolateFn}
`;

export const Subtitle = styled.h4`
  ${baseTypographyStyle}
  font-size: 16px;
  line-height: 21px;
  ${boxInterpolateFn}
`;

export const InfoText = styled.p`
  ${baseTypographyStyle}
  font-size: 12px;
  line-height: 18px;
  ${boxInterpolateFn}
`;

export const InfoTextBold = styled(InfoText)`
  font-weight: 500;
  ${boxInterpolateFn}
`;

export const Typography = ({variant = 'paragraph', children, ...props}: TypographyProps) => {
  
  switch(variant) {
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
}
