import { renderCssResult } from '../../testUtils/renderCssResult';
import { marginInterpolateFn, paddingInterpolateFn } from "./spacing"

const theme: any = {
  spacing: {
    unit: 6,
  },
};

describe.each([['margin', 'm', marginInterpolateFn], ['padding', 'p', paddingInterpolateFn]])('%s', (name, short, interpolateFn: any) => {
    test('pass no props', () => {
      const result = interpolateFn({ theme });
      const renderedResult = renderCssResult(result, { theme });
      expect(renderedResult).toEqual('');
    });

    test(`pass ${name} for all directions`, () => {
      const result = interpolateFn({ theme, [short]: 2 });
      const renderedResult = renderCssResult(result, { theme });
      expect(renderedResult).toEqual(`${name}:12px;`);
    });

    test(`pass x direction ${name}`, () => {
      const result = interpolateFn({ theme, [`${short}x`]: 2 });
      const renderedResult = renderCssResult(result, { theme });
      expect(renderedResult).toContain(`${name}-left:12px;`);
      expect(renderedResult).toContain(`${name}-right:12px;`);
    });

    test(`pass y direction ${name}`, () => {
      const result = interpolateFn({ theme, [`${short}y`]: 2 });
      const renderedResult = renderCssResult(result, { theme });
      expect(renderedResult).toContain(`${name}-top:12px;`);
      expect(renderedResult).toContain(`${name}-bottom:12px;`);
    });

    test.each([['top', 't'], ['right', 'r'], ['bottom', 'b'], ['left', 'l']])
      (`pass %s direction ${name}`, (direction, shortDir) => {
        const result = interpolateFn({ theme, [`${short}${shortDir}`]: 2 });
        const renderedResult = renderCssResult(result, { theme });
        expect(renderedResult).toEqual(`${name}-${direction}:12px;`);
      });
  });
