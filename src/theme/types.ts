import React from 'react';
import type { CSSInterpolation } from '@emotion/serialize';
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
import { Breakpoints } from './breakpoints';
import { TextAreaStyles } from '../TextArea/styles';
import { AvatarStyles } from '../Avatar/styles';
import { ToolbarStyles } from '../Toolbar/styles';
import { TooltipStyles } from '../Tooltip/styles';
import { IconButtonStyles } from '../IconButton/styles';
import { ModalStyles } from '../Modal/styles';
import { ButtonBarStyles } from '../ButtonBar/styles';
import { LinkStyles } from '../Link/styles';
import { ToastCardStyles } from '../ToastCard/styles';
import { ImageStyles } from '../Image/styles';
import { NativeSelectStyles } from '../NativeSelect/styles';
import { AnimationStyles } from '../animation/styles';
import { SliderStyles } from '../Slider/styles';
import { Fluid } from './fluid';
import { ShapeTokens } from './shape';

export type Style<P extends PabloThemeableProps = PabloThemeableProps> =
  | CSSInterpolation
  | ((props?: P) => CSSInterpolation);
export interface PabloTheme {
  spacing: Spacing;
  colors: Colors;
  fluid: Fluid;
  shape: ShapeTokens;
  typography: Typography;
  breakpoints: Breakpoints;
}

export type FluidValue = number | [number, number];

export type ThemeValueGetter<V = any> = (
  value: V
) => ({ theme }: PabloThemeableProps) => CSSInterpolation;

export interface PabloThemeFull extends PabloTheme {
  componentStyles: ComponentStyles;
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

export interface ComponentPrimitiveStyle {
  css?: Style;
}

export interface ComponentStyles {
  animation: AnimationStyles;
  card: CardStyles;
  tabs: TabsStyles;
  sidebarNav: SidebarNavStyles;
  slider: SliderStyles;
  button: ButtonStyles;
  checkbox: CheckboxStyles;
  switch: SwitchStyles;
  radio: RadioStyles;
  image: ImageStyles;
  input: InputStyles;
  textarea: TextAreaStyles;
  nativeSelect: NativeSelectStyles;
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
  root?: Document | ShadowRoot;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme & { componentStyles: ComponentStyles };
}
