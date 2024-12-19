import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { color } from './color';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

test('bg color', () => {
  expect(color({ ...props, bgColor: 'brand.main' })).toEqual({
    backgroundColor: 'var(--pbl-theme-colors-brand-main)',
  });
});

test('text color', () => {
  expect(color({ ...props, textColor: 'brand.main' })).toEqual({
    color: 'var(--pbl-theme-colors-brand-main)',
  });
});

test('opacity', () => {
  expect(color({ ...props, opacity: 0.5 })).toEqual({
    opacity: 0.5,
  });
  expect(color({ ...props, opacity: '0.4' })).toEqual({
    opacity: '0.4',
  });
});

test('styled interpolation functions', () => {
  expect(color.bgColor('brand.main')(props)).toEqual({
    backgroundColor: 'var(--pbl-theme-colors-brand-main)',
  });
  expect(color.textColor('brand.main')(props)).toEqual({
    color: 'var(--pbl-theme-colors-brand-main)',
  });
  expect(color.opacity(0.5)(props)).toEqual({
    opacity: 0.5,
  });
  expect(color.opacity('0.4')(props)).toEqual({
    opacity: '0.4',
  });
});
