import styled from '@emotion/styled';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle } from '../styleHelpers';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { LinkStyleProperties } from './styles';

export type LinkProps = BaseProps<LinkStyleProperties>;

export const Link = styled.a<LinkProps>`
  ${baseStyle}
  color: ${getComponentStyle(['link', 'color'])};
  text-decoration: ${getComponentStyle(['link', 'textDecoration'])};
  font-style: ${getComponentStyle(['link', 'fontStyle'])};
  font-weight: ${getComponentStyle(['link', 'fontWeight'])};
  outline: 0;
  ${getCustomStyles('link.styles', 'root')}

  &:hover {
    color: ${getComponentStyle(['link', 'hover', 'color'])};
    text-decoration: ${getComponentStyle(['link', 'hover', 'textDecoration'])};
    font-style: ${getComponentStyle(['link', 'hover', 'fontStyle'])};
    font-weight: ${getComponentStyle(['link', 'hover', 'fontWeight'])};
    ${getCustomStyles('link.styles', 'hover')}
  }
  &:visited {
    color: ${getComponentStyle(['link', 'visited', 'color'])};
    text-decoration: ${getComponentStyle(['link', 'visited', 'textDecoration'])};
    font-style: ${getComponentStyle(['link', 'visited', 'fontStyle'])};
    font-weight: ${getComponentStyle(['link', 'visited', 'fontWeight'])};
    ${getCustomStyles('link.styles', 'visited')}
  }
  &:focus {
    color: ${getComponentStyle(['link', 'focus', 'color'])};
    text-decoration: ${getComponentStyle(['link', 'focus', 'textDecoration'])};
    font-style: ${getComponentStyle(['link', 'focus', 'fontStyle'])};
    font-weight: ${getComponentStyle(['link', 'focus', 'fontWeight'])};
    ${getCustomStyles('link.styles', 'focus')}
  }
`;
