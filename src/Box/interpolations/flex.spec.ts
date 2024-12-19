import { defaultTheme } from '../../theme';
import { PabloThemeableProps } from '../../theme/types';
import { flexItem, flexContainer } from './flex';

let props: PabloThemeableProps = {
  theme: defaultTheme,
} as any;

beforeEach(() => {
  props = {
    theme: defaultTheme,
  } as any;
});

describe('flexItem', () => {
  test('flex', () => {
    expect(flexItem({ ...props, flex: 1 })).toEqual({
      flex: 1,
    });
  });

  test('flexGrow', () => {
    expect(flexItem({ ...props, grow: 1 })).toEqual({
      flexGrow: 1,
    });
  });

  test('flexShrink', () => {
    expect(flexItem({ ...props, shrink: 1 })).toEqual({
      flexShrink: 1,
    });
  });

  test('flexBasis', () => {
    expect(flexItem({ ...props, flexBasis: 'auto' })).toEqual({
      flexBasis: 'auto',
    });
  });

  test('justifySelf', () => {
    expect(flexItem({ ...props, justifySelf: 'center' })).toEqual({
      justifySelf: 'center',
    });
  });

  test('alignSelf', () => {
    expect(flexItem({ ...props, alignSelf: 'center' })).toEqual({
      alignSelf: 'center',
    });
  });

  test('order', () => {
    expect(flexItem({ ...props, order: 1 })).toEqual({
      order: 1,
    });
  });

  test('styled interpolation functions', () => {
    expect(flexItem.grow(1)(props)).toEqual({
      flexGrow: 1,
    });
    expect(flexItem.shrink(1)(props)).toEqual({
      flexShrink: 1,
    });
    expect(flexItem.basis('auto')(props)).toEqual({
      flexBasis: 'auto',
    });
    expect(flexItem.justifySelf('center')(props)).toEqual({
      justifySelf: 'center',
    });
    expect(flexItem.alignSelf('center')(props)).toEqual({
      alignSelf: 'center',
    });
    expect(flexItem.order(1)(props)).toEqual({
      order: 1,
    });
  });
});

describe('flexContainer', () => {
  test('flexDirection', () => {
    expect(flexContainer({ ...props, direction: 'column' })).toEqual({
      flexDirection: 'column',
    });
  });

  test('flexWrap', () => {
    expect(flexContainer({ ...props, wrap: 'wrap' })).toEqual({
      flexWrap: 'wrap',
    });
  });

  test('justifyContent', () => {
    expect(flexContainer({ ...props, justifyContent: 'center' })).toEqual({
      justifyContent: 'center',
    });
  });

  test('alignItems', () => {
    expect(flexContainer({ ...props, alignItems: 'center' })).toEqual({
      alignItems: 'center',
    });
  });

  test('alignContent', () => {
    expect(flexContainer({ ...props, alignContent: 'center' })).toEqual({
      alignContent: 'center',
    });
  });

  test('styled interpolation functions', () => {
    expect(flexContainer.direction('column')(props)).toEqual({
      flexDirection: 'column',
    });
    expect(flexContainer.wrap('wrap')(props)).toEqual({
      flexWrap: 'wrap',
    });
    expect(flexContainer.justifyContent('center')(props)).toEqual({
      justifyContent: 'center',
    });
    expect(flexContainer.alignItems('center')(props)).toEqual({
      alignItems: 'center',
    });
    expect(flexContainer.alignContent('center')(props)).toEqual({
      alignContent: 'center',
    });
  });
});
