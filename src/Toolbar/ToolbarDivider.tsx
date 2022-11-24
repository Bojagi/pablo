import styled from 'styled-components';
import { baseStyle } from '../shared/baseStyle';
import { getComponentStyle } from '../styleHelpers/getComponentStyle';
import { BaseProps } from '../types';
import { getCustomStyles } from '../utils/useCustomStyles';
import { ToolbarDividerStyleProperties } from './styles';

export const ToolbarDivider = styled('div').attrs({
  role: 'separator',
  'aria-orientation': 'vertical',
})<BaseProps<ToolbarDividerStyleProperties>>`
  ${baseStyle}
  margin: 0 ${getComponentStyle('toolbar.gap')};
  width: ${getComponentStyle('toolbar.divider.width')}px;
  align-self: stretch;
  background-color: ${getComponentStyle('toolbar.divider.color')};
  ${getCustomStyles('toolbar.divider.styles', 'root')}
`;
