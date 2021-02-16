import styled from 'styled-components';
import { getComponentStyle } from '../utils/styleHelpers';

export const Link = styled.a`
  color: ${getComponentStyle('link.color')};
  text-decoration: ${getComponentStyle('link.textDecoration')};
  font-style: ${getComponentStyle('link.fontStyle')};
  font-weight: ${getComponentStyle('link.fontWeight')};
  outline: 0;

  &:hover {
    color: ${getComponentStyle('link.hover.color')};
    text-decoration: ${getComponentStyle('link.hover.textDecoration')};
    font-style: ${getComponentStyle('link.hover.fontStyle')};
    font-weight: ${getComponentStyle('link.hover.fontWeight')};
  }
  &:visited {
    color: ${getComponentStyle('link.visited.color')};
    text-decoration: ${getComponentStyle('link.visited.textDecoration')};
    font-style: ${getComponentStyle('link.visited.fontStyle')};
    font-weight: ${getComponentStyle('link.visited.fontWeight')};
  }
  &:focus {
    color: ${getComponentStyle('link.focus.color')};
    text-decoration: ${getComponentStyle('link.focus.textDecoration')};
    font-style: ${getComponentStyle('link.focus.fontStyle')};
    font-weight: ${getComponentStyle('link.focus.fontWeight')};
  }
`;
