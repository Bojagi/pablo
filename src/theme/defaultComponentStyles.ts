import { buttonStyles, ButtonStyles } from '../Button/styles';
import { CardStyles, cardStyles } from '../Card/styles';
import { sidebarNavStyles, SidebarNavStyles } from '../SidebarNav/styles';
import { SwitchStyles, switchStyles } from '../Switch/styles';
import { TabsStyles, tabsStyles } from '../Tabs/styles';
import { CheckboxStyles, checkboxStyles } from '../Checkbox/styles';

export interface ComponentStyles {
  card: CardStyles;
  tabs: TabsStyles;
  sidebarNav: SidebarNavStyles;
  button: ButtonStyles;
  checkbox: CheckboxStyles;
  switch: SwitchStyles;
}

export const defaultComponentStyles: ComponentStyles = {
  card: cardStyles,
  tabs: tabsStyles,
  sidebarNav: sidebarNavStyles,
  button: buttonStyles,
  checkbox: checkboxStyles,
  switch: switchStyles,
};
