import type * as CSS from 'csstype';
import { identityTransform, InterpolationTransformFn, system } from '../system';

export interface FlexItemProps {
  grow?: number | boolean;
  shrink?: number | boolean;
  flexBasis?: CSS.Property.FlexBasis;
  flex?: CSS.Property.Flex;
  justifySelf?: CSS.Property.JustifySelf;
  alignSelf?: CSS.Property.AlignSelf;
  order?: CSS.Property.Order;
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
