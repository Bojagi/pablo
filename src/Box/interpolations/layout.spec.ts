import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { layout } from './layout';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

test('width', () => {
  expect(layout({ ...props, width: 100 })).toEqual({
    width: '100px',
  });
  expect(layout({ ...props, width: '100%' })).toEqual({
    width: '100%',
  });
  expect(layout({ ...props, width: 0.9 })).toEqual({
    width: '90%',
  });
});

test('height', () => {
  expect(layout({ ...props, height: 100 })).toEqual({
    height: '100px',
  });
  expect(layout({ ...props, height: '100%' })).toEqual({
    height: '100%',
  });
});

test('minWidth', () => {
  expect(layout({ ...props, minWidth: 100 })).toEqual({
    minWidth: '100px',
  });
  expect(layout({ ...props, minWidth: '100%' })).toEqual({
    minWidth: '100%',
  });
});

test('minHeight', () => {
  expect(layout({ ...props, minHeight: 100 })).toEqual({
    minHeight: '100px',
  });
  expect(layout({ ...props, minHeight: '100%' })).toEqual({
    minHeight: '100%',
  });
});

test('maxWidth', () => {
  expect(layout({ ...props, maxWidth: 100 })).toEqual({
    maxWidth: '100px',
  });
  expect(layout({ ...props, maxWidth: '100%' })).toEqual({
    maxWidth: '100%',
  });
});

test('maxHeight', () => {
  expect(layout({ ...props, maxHeight: 100 })).toEqual({
    maxHeight: '100px',
  });
  expect(layout({ ...props, maxHeight: '100%' })).toEqual({
    maxHeight: '100%',
  });
});

test('squareSize', () => {
  expect(layout({ ...props, squareSize: 100 })).toEqual({
    width: '100px',
    height: '100px',
  });
  expect(layout({ ...props, squareSize: '100%' })).toEqual({
    width: '100%',
    height: '100%',
  });
});

test('display', () => {
  expect(layout({ ...props, display: 'flex' })).toEqual({
    display: 'flex',
  });
});

test('styled interpolation functions', () => {
  expect(layout.width(100)(props)).toEqual({
    width: '100px',
  });
  expect(layout.height(100)(props)).toEqual({
    height: '100px',
  });
  expect(layout.minWidth(100)(props)).toEqual({
    minWidth: '100px',
  });
  expect(layout.minHeight(100)(props)).toEqual({
    minHeight: '100px',
  });
  expect(layout.maxWidth(100)(props)).toEqual({
    maxWidth: '100px',
  });
  expect(layout.maxHeight(100)(props)).toEqual({
    maxHeight: '100px',
  });
  expect(layout.squareSize(100)(props)).toEqual({
    width: '100px',
    height: '100px',
  });
  expect(layout.display('flex')(props)).toEqual({
    display: 'flex',
  });
});
