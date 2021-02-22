import React from 'react';
import {
  CSSObject,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  InterpolationFunction,
} from 'styled-components';
import { ButtonStyles } from '../Button/styles';
import { CardStyles } from '../Card/styles';
import { SidebarNavStyles } from '../SidebarNav/styles';
import { SwitchStyles } from '../Switch/styles';
import { TabsStyles } from '../Tabs/styles';
import { CheckboxStyles } from '../Checkbox/styles';
import { RadioStyles } from '../Radio/styles';
import { InputStyles } from '../Input/styles';

import { Colors } from './colors';
import { Spacing } from './spacing';
import { Typography } from './typography';
import { TextAreaStyles } from '../TextArea/styles';
import { AvatarStyles } from '../Avatar/styles';
import { ToolbarStyles } from '../Toolbar/styles';
import { TooltipStyles } from '../Tooltip/styles';
import { IconButtonStyles } from '../IconButton/styles';
import { ModalStyles } from '../Modal/styles';
import { ButtonBarStyles } from '../ButtonBar/styles';
import { LinkStyles } from '../Link/styles';
import { ToastCardStyles } from '../ToastCard/styles';

export type Style =
  | string
  | CSSObject
  | FlattenInterpolation<any>
  | FlattenSimpleInterpolation
  | InterpolationFunction<any>;
export interface PabloTheme {
  space: Spacing;
  colors: Colors;
  typography: Typography;
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface ComponentStyles {
  card: CardStyles;
  tabs: TabsStyles;
  sidebarNav: SidebarNavStyles;
  button: ButtonStyles;
  checkbox: CheckboxStyles;
  switch: SwitchStyles;
  radio: RadioStyles;
  input: InputStyles;
  textarea: TextAreaStyles;
  avatar: AvatarStyles;
  toolbar: ToolbarStyles;
  tooltip: TooltipStyles;
  iconButton: IconButtonStyles;
  modal: ModalStyles;
  buttonBar: ButtonBarStyles;
  link: LinkStyles;
  toastCard: ToastCardStyles;
}

export interface PabloThemeProviderProps {
  theme?: RecursivePartial<PabloTheme>;
  componentStyles?: RecursivePartial<ComponentStyles>;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme;
}
