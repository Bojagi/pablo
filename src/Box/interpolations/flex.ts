import type * as CSS from 'csstype';
import { identityTransform, InterpolationTransformFn, ResponsiveValue, system } from '../system';

export interface FlexItemProps {
  grow?: ResponsiveValue<number | boolean>;
  shrink?: ResponsiveValue<number | boolean>;
  flexBasis?: ResponsiveValue<CSS.Property.FlexBasis>;
  flex?: ResponsiveValue<CSS.Property.Flex>;
  justifySelf?: ResponsiveValue<CSS.Property.JustifySelf>;
  alignSelf?: ResponsiveValue<CSS.Property.AlignSelf>;
  order?: ResponsiveValue<CSS.Property.Order>;
}

export interface FlexContainerProps {
  direction?: ResponsiveValue<CSS.Property.FlexDirection>;
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
  justifyContent?: ResponsiveValue<CSS.Property.JustifyContent>;
  alignItems?: ResponsiveValue<CSS.Property.AlignItems>;
  alignContent?: ResponsiveValue<CSS.Property.AlignContent>;
}

export const flexItem = system([
  {
    properties: ['flexGrow'],
    fromProps: ['grow', 'flexGrow'],
  },
  {
    properties: ['flexShrink'],
    fromProps: ['shrink', 'flexShrink'],
  },
  {
    properties: ['flexBasis'],
    as: 'basis',
  },
  {
    properties: ['flex'],
  },
  {
    properties: ['justifySelf'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.JustifySelf>,
  },
  {
    properties: ['alignSelf'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.AlignSelf>,
  },
  {
    properties: ['order'],
  },
]);

export const flexContainer = system([
  {
    properties: ['flexWrap'],
    fromProps: ['wrap'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.FlexWrap>,
  },
  {
    properties: ['flexDirection'],
    fromProps: ['direction'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.FlexDirection>,
  },
  {
    properties: ['justifyContent'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.JustifyContent>,
  },
  {
    properties: ['alignItems'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.AlignItems>,
  },
  {
    properties: ['alignContent'],
    transform: identityTransform as InterpolationTransformFn<CSS.Property.AlignContent>,
  },
]);
