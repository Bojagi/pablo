import { renderStyledComponent } from '../../testUtils/renderStyledComponent';
import { marginInterpolateFn, paddingInterpolateFn } from './spacing';

const theme: any = {
  spacing: {
    unit: 6,
  },
};

describe.each([
  ['margin', 'm', marginInterpolateFn],
  ['padding', 'p', paddingInterpolateFn],
])('%s', (name, short, interpolateFn: any) => {
  test('pass no props', () => {
    const props = { theme };
    const elem = renderStyledComponent(props, interpolateFn);
    expect(elem).not.toHaveStyleRule(name);
  });

  test(`pass ${name} for all directions`, () => {
    const props = { theme, [short]: 2 };

    const elem = renderStyledComponent(props, interpolateFn);
    expect(elem).toHaveStyleRule(name, '12px');
  });

  test(`pass x direction ${name}`, () => {
    const props = { theme, [`${short}x`]: 2 };
    const elem = renderStyledComponent(props, interpolateFn);
    expect(elem).toHaveStyleRule(`${name}-left`, '12px');
    expect(elem).toHaveStyleRule(`${name}-right`, '12px');
  });

  test(`pass y direction ${name}`, () => {
    const props = { theme, [`${short}y`]: 2 };
    const elem = renderStyledComponent(props, interpolateFn);
    expect(elem).toHaveStyleRule(`${name}-top`, '12px');
    expect(elem).toHaveStyleRule(`${name}-bottom`, '12px');
  });

  test.each([
    ['top', 't'],
    ['right', 'r'],
    ['bottom', 'b'],
    ['left', 'l'],
  ])(`pass %s direction ${name}`, (direction, shortDir) => {
    const props = { theme, [`${short}${shortDir}`]: 2 };
    const elem = renderStyledComponent(props, interpolateFn);
    expect(elem).toHaveStyleRule(`${name}-${direction}`, '12px');
  });
});
