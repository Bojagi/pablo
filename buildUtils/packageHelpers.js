import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { packageExports } from './packageExports.js';

export function readPackage(dir) {
  return JSON.parse(readFileSync(resolve(dir, 'package.json')));
}

export function writePackage(dir, content) {
  return writeFileSync(resolve(dir, 'package.json'), JSON.stringify(content, null, 2));
}

function getExportKey(exportName){
  if(exportName === 'index'){
    return '.';
  }
  return `./${exportName.replace('/index', '')}`;
}

function getExportValue(exportName){
  return {
    import: `./${exportName}.js`,
    require: `./${exportName}.cjs`
  }
}

export function generatePackageExports(exports = packageExports) {
  return exports
    .map(exportName => ([
      getExportKey(exportName), getExportValue(exportName)
    ]))
    .reduce((acc, [key, value])=> ({...acc, [key]: value}), {})
} 
