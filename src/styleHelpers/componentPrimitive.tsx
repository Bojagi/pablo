import type { Interpolation } from '@emotion/react';
import { ComponentPath } from '../types';
import { guaranteeArray } from '../utils/guaranteeArray';
import { getComponentStyle } from './getComponentStyle';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

interface CreateComponentPrimitiveOptions<T extends keyof JSX.IntrinsicElements> {
  tag?: T;
}

interface ComponentPrimitiveProps {
  componentPath: ComponentPath;
}

const getPrimitiveStyle =
  <P extends object>(
    property: string | ComponentPath,
    transformFn?: (value: unknown) => string | number
  ) =>
  (props: P & ComponentPrimitiveProps) => {
    const propertyPath = guaranteeArray(property);
    return getComponentStyle([...props.componentPath, ...propertyPath], transformFn)(props);
  };

const componentPrimitive =
  <P extends object, T extends keyof JSX.IntrinsicElements>(
    componentPath: ComponentPath,
    { tag = 'div' as any }: CreateComponentPrimitiveOptions<T> = {}
  ) =>
  (
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<P & ComponentPrimitiveProps<P>>>
  ) => {
    const StyledComponent = styled(tag)<P & ComponentPrimitiveProps<P>>(
      template,
      ...styles,
      getPrimitiveStyle('css')
    );
    return forwardRef<HTMLElement, P & JSX.IntrinsicElements[T]>((props: any, ref) => (
      <StyledComponent componentPath={componentPath} ref={ref} {...props} />
    ));
  };

export { componentPrimitive, getPrimitiveStyle };
