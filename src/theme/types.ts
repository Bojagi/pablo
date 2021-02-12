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

export type Style =
  | string
  | CSSObject
  | FlattenInterpolation<any>
  | FlattenSimpleInterpolation
  | InterpolationFunction<any>;
export interface PabloTheme {
  spacing: Spacing;
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
}

export interface PabloThemeProviderProps {
  theme?: RecursivePartial<PabloTheme>;
  componentStyles?: RecursivePartial<ComponentStyles>;
  children: React.ReactNode;
}

export interface PabloThemeableProps {
  theme: PabloTheme;
}
