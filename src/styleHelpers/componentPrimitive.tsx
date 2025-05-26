import type { Interpolation } from '@emotion/react';
import { ComponentPath } from '../types';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from './getComponentStyle';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

interface CreateComponentPrimitiveOptions<T extends keyof JSX.IntrinsicElements> {
  tag?: T;
}

type ComponentPrimitiveProps<P extends object> = {
  componentPath: ComponentPath<P>;
} & P;

const getPrimitiveStyle =
  <P extends object, I extends ComponentPrimitiveProps<P>>(
    property: string | string[],
    transformFn?: (value: unknown) => string | number | any
  ) =>
  (props: I) => {
    const componentPath = props.componentPath as ComponentPath<P>;
    const propertyArray = guaranteeArray(property);
    return getComponentStyle([...componentPath, ...propertyArray], transformFn)(props);
  };

const componentPrimitive =
  <P extends object, T extends keyof JSX.IntrinsicElements = 'div'>(
    componentPath: ComponentPath<P>,
    { tag = 'div' as any }: CreateComponentPrimitiveOptions<T> = {}
  ) =>
  (template: TemplateStringsArray, ...styles: Array<Interpolation<ComponentPrimitiveProps<P>>>) => {
    const extendedTemplate = Object.assign([...template, ''], { raw: [...template.raw, ''] });
    const StyledComponent = styled(tag)<ComponentPrimitiveProps<P>>(
      extendedTemplate as TemplateStringsArray,
      ...styles,
      getPrimitiveStyle('css')
    );

    return forwardRef<HTMLElement, P & JSX.IntrinsicElements[T]>((props: any, ref) => (
      <StyledComponent componentPath={componentPath} ref={ref} {...props} />
    ));
  };

export { componentPrimitive, getPrimitiveStyle };
