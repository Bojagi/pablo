import { css } from "styled-components";
import { getColor, getSpacing } from "../styleHelpers";
import { Style } from "../theme/types";

export interface TabActiveBorderBottomStyles {
  color: Style;
  thickness: Style;
  gap: Style;
  radius: Style;
}

export interface TabActiveStyles {
  padding: Style;
  margin: Style;
  color: Style;
  bottomBorder: TabActiveBorderBottomStyles;
}

export interface TabHoverStyles {
  backgroundColor: Style;
}

export interface TabStyles {
  color: Style;
  padding: Style;
  margin: Style;
  hover: TabHoverStyles;
  active: TabActiveStyles;
}

export interface TabsStyles {
  gapSpacing: number;
    tab: TabStyles;
}

export const tabsStyles = {
  gapSpacing: 0.5,
  tab: {
    color: getColor('common', 'black'),
    padding: css`${getSpacing(1)} ${getSpacing(1.5)}`,
    margin: css`0 0 ${getSpacing(0.5)}`,
    hover: {
      backgroundColor: getColor('brand', 'light'),
    },
    active: {
      padding: css`${getSpacing(1)} ${getSpacing(1.5)} ${getSpacing(1.5)}`,
      margin: '0',
      color: getColor('brand'),
      bottomBorder: {
        color: getColor('brand'),
        thickness: getSpacing(0.5),
        gap: getSpacing(1),
        radius: getSpacing(0.5),
      }
    },
  },
};
