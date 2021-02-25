import { conditionalStyles } from './conditionalStyles';

type HansProps = {
  hans: 'wurst' | 'meiser';
};

test('get styles depending on prop value', () => {
  const interpolateFn = conditionalStyles<HansProps>('hans', {
    wurst: 'style1' as any,
    meiser: 'style2' as any,
  });
  expect(interpolateFn({ hans: 'wurst' } as any)).toBe('style1');
  expect(interpolateFn({ hans: 'meiser' } as any)).toBe('style2');
});
