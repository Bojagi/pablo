import { resolve } from 'path';
import { readPackage } from './packageHelpers';
import { builtinModules } from 'module';
import { packageExports } from '../packageExports.js';

const repoDir = resolve(import.meta.dirname, '..')

export function getLibEntries(entries = packageExports){
  return entries
  .map(entry => [entry, resolve(repoDir, 'src', entry)])
  .reduce((acc, [entry, entryPath]) => ({ ...acc, [entry]: entryPath }), {})
}

export function getExternals(additional = []) {
  const packageObj = readPackage(repoDir);

  const externals = [
    ...Object.keys({
      ...packageObj.dependencies,
      ...packageObj.peerDependencies,
      ...packageObj.devDependencies,
    }),
    ...builtinModules,
    ...additional,
  ];

  return externals;
}
