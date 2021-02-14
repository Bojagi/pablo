import styled from 'styled-components';
import { getComponentStyle } from '../utils/styleHelpers/getComponentStyle';

export const ToolbarDivider = styled.div`
  margin: 0 ${getComponentStyle('toolbar.gap')};
  width: ${getComponentStyle('toolbar.divider.width')}px;
  align-self: stretch;
  background-color: ${getComponentStyle('toolbar.divider.color')};
`;
