import { css } from "styled-components";
import { getSpacing } from "../styleHelpers";

export interface BoxMarginProps {
  m?: number;
  mx?: number;
  my?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mt?: number;
}

export interface BoxPaddingProps {
  p?: number;
  px?: number;
  py?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  pt?: number;
}

export const marginInterpolateFn = (props: BoxMarginProps) => css`
  ${props.m && css`margin: ${getSpacing(props.m)};`}
  ${props.mx && css`
    margin-left: ${getSpacing(props.mx)};
    margin-right: ${getSpacing(props.mx)};
  `}
  ${props.my && css`
    margin-top: ${getSpacing(props.my)};
    margin-bottom: ${getSpacing(props.my)};
  `}
  ${props.mr && css`margin-right: ${getSpacing(props.mr)};`}
  ${props.mb && css`margin-bottom: ${getSpacing(props.mb)};`}
  ${props.ml && css`margin-left: ${getSpacing(props.ml)};`}
  ${props.mt && css`margin-top: ${getSpacing(props.mt)};`}
`;

export const paddingInterpolateFn = (props: BoxPaddingProps) => css`
  ${props.p && css`padding: ${getSpacing(props.p)};`}
  ${props.px && css`
    padding-left: ${getSpacing(props.px)};
    padding-right: ${getSpacing(props.px)};
  `}
  ${props.py && css`
    padding-top: ${getSpacing(props.py)};
    padding-bottom: ${getSpacing(props.py)};
  `}
  ${props.pr && css`padding-right: ${getSpacing(props.pr)};`}
  ${props.pb && css`padding-bottom: ${getSpacing(props.pb)};`}
  ${props.pl && css`padding-left: ${getSpacing(props.pl)};`}
  ${props.pt && css`padding-top: ${getSpacing(props.pt)};`}
`;
