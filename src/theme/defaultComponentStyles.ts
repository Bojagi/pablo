import { avatarStyles } from '../Avatar/styles';
import { buttonStyles } from '../Button/styles';
import { buttonBarStyles } from '../ButtonBar/styles';
import { cardStyles } from '../Card/styles';
import { checkboxStyles } from '../Checkbox/styles';
import { iconButtonStyles } from '../IconButton/styles';
import { imageStyles } from '../Image/styles';
import { inputStyles } from '../Input/styles';
import { linkStyles } from '../Link/styles';
import { menuStyles } from '../Menu/styles';
import { modalStyles } from '../Modal/styles';
import { nativeSelectStyles } from '../NativeSelect/styles';
import { radioStyles } from '../Radio/styles';
import { sidebarNavStyles } from '../SidebarNav/styles';
import { switchStyles } from '../Switch/styles';
import { tabsStyles } from '../Tabs/styles';
import { textareaStyles } from '../TextArea/styles';
import { toastCardStyles } from '../ToastCard/styles';
import { toolbarStyles } from '../Toolbar/styles';
import { tooltipStyles } from '../Tooltip/styles';
import { typographyStyles } from '../Typography/styles';

const defaultComponentStyles = {
  button: buttonStyles,
  avatar: avatarStyles,
  buttonBar: buttonBarStyles,
  card: cardStyles,
  checkbox: checkboxStyles,
  iconButton: iconButtonStyles,
  image: imageStyles,
  input: inputStyles,
  link: linkStyles,
  menu: menuStyles,
  modal: modalStyles,
  nativeSelect: nativeSelectStyles,
  radio: radioStyles,
  sidebarNav: sidebarNavStyles,
  switch: switchStyles,
  tabs: tabsStyles,
  textArea: textareaStyles,
  toastCard: toastCardStyles,
  toolbar: toolbarStyles,
  tooltip: tooltipStyles,
  typography: typographyStyles,
};

export function getDefaultComponentStyles() {
  return { ...defaultComponentStyles };
}
