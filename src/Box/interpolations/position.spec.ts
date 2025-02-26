import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { position } from './position';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

test('position', () => {
  expect(position({ ...props, position: 'absolute' })).toEqual({
    position: 'absolute',
  });
  expect(position({ ...props, pos: 'absolute' })).toEqual({
    position: 'absolute',
  });
});

test('top', () => {
  expect(position({ ...props, top: 2 })).toEqual({
    top: expect.stringMatching(/clamp\(1rem, .*?, 1\.5rem\)/),
  });
  expect(position({ ...props, top: '100%' })).toEqual({
    top: '100%',
  });
});

test('right', () => {
  expect(position({ ...props, right: 2 })).toEqual({
    right: expect.stringMatching(/clamp\(1rem, .*?, 1\.5rem\)/),
  });
  expect(position({ ...props, right: '100%' })).toEqual({
    right: '100%',
  });
});

test('bottom', () => {
  expect(position({ ...props, bottom: 2 })).toEqual({
    bottom: expect.stringMatching(/clamp\(1rem, .*?, 1\.5rem\)/),
  });
  expect(position({ ...props, bottom: '100%' })).toEqual({
    bottom: '100%',
  });
});

test('left', () => {
  expect(position({ ...props, left: 2 })).toEqual({
    left: expect.stringMatching(/clamp\(1rem, .*?, 1\.5rem\)/),
  });
  expect(position({ ...props, left: '100%' })).toEqual({
    left: '100%',
  });
});
