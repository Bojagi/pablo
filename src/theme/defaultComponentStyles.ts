import { buttonStyles } from '../Button/styles';
import { cardStyles } from '../Card/styles';
import { sidebarNavStyles } from '../SidebarNav/styles';
import { switchStyles } from '../Switch/styles';
import { tabsStyles } from '../Tabs/styles';
import { checkboxStyles } from '../Checkbox/styles';
import { radioStyles } from '../Radio/styles';
import { inputStyles } from '../Input/styles';
import { ComponentStyles } from './types';
import { textareaStyles } from '../TextArea/styles';
import { avatarStyles } from '../Avatar/styles';
import { toolbarStyles } from '../Toolbar/styles';

export const defaultComponentStyles: ComponentStyles = {
  card: cardStyles,
  tabs: tabsStyles,
  sidebarNav: sidebarNavStyles,
  button: buttonStyles as any,
  checkbox: checkboxStyles,
  switch: switchStyles,
  radio: radioStyles,
  input: inputStyles,
  textarea: textareaStyles,
  avatar: avatarStyles,
  toolbar: toolbarStyles,
};
