import { omit } from './omit';
import { pick } from './pick';

const splitProps = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  const picked = pick(obj, keys);
  const omitted = omit(obj, keys);
  return [picked, omitted];
};

export { splitProps };
