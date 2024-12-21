import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { svg } from './svg';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

test('fill color', () => {
  expect(svg({ ...props, fillColor: 'brand.main' })).toEqual({
    fill: 'var(--pbl-theme-colors-brand-main)',
  });
});

test('stroke color', () => {
  expect(svg({ ...props, strokeColor: 'brand.main' })).toEqual({
    stroke: 'var(--pbl-theme-colors-brand-main)',
  });
});

test('styled interpolation functions', () => {
  expect(svg.fillColor('brand.main')(props)).toEqual({
    fill: 'var(--pbl-theme-colors-brand-main)',
  });
  expect(svg.strokeColor('brand.main')(props)).toEqual({
    stroke: 'var(--pbl-theme-colors-brand-main)',
  });
});
