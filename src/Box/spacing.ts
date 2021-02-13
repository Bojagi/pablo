import { css } from 'styled-components';
import { getSpacing } from '../utils/styleHelpers/getSpacing';
import { isDefined } from '../utils/isDefined';

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
  ${isDefined(props.m) &&
  css`
    margin: ${getSpacing(props.m)};
  `}
  ${isDefined(props.mx) &&
  css`
    margin-left: ${getSpacing(props.mx)};
    margin-right: ${getSpacing(props.mx)};
  `}
  ${isDefined(props.my) &&
  css`
    margin-top: ${getSpacing(props.my)};
    margin-bottom: ${getSpacing(props.my)};
  `}
  ${isDefined(props.mr) &&
  css`
    margin-right: ${getSpacing(props.mr)};
  `}
  ${isDefined(props.mb) &&
  css`
    margin-bottom: ${getSpacing(props.mb)};
  `}
  ${isDefined(props.ml) &&
  css`
    margin-left: ${getSpacing(props.ml)};
  `}
  ${isDefined(props.mt) &&
  css`
    margin-top: ${getSpacing(props.mt)};
  `}
`;

export const paddingInterpolateFn = (props: BoxPaddingProps) => css`
  ${isDefined(props.p) &&
  css`
    padding: ${getSpacing(props.p)};
  `}
  ${isDefined(props.px) &&
  css`
    padding-left: ${getSpacing(props.px)};
    padding-right: ${getSpacing(props.px)};
  `}
  ${isDefined(props.py) &&
  css`
    padding-top: ${getSpacing(props.py)};
    padding-bottom: ${getSpacing(props.py)};
  `}
  ${isDefined(props.pr) &&
  css`
    padding-right: ${getSpacing(props.pr)};
  `}
  ${isDefined(props.pb) &&
  css`
    padding-bottom: ${getSpacing(props.pb)};
  `}
  ${isDefined(props.pl) &&
  css`
    padding-left: ${getSpacing(props.pl)};
  `}
  ${isDefined(props.pt) &&
  css`
    padding-top: ${getSpacing(props.pt)};
  `}
`;
