import { resolve } from 'path';
import { readPackage, writePackage, generatePackageExports } from '../buildUtils/packageHelpers.js'

const SRC_DIR = resolve(import.meta.dirname, '..')
const DIST_DIR = resolve(import.meta.dirname, '..', 'dist')
const VERSION = process.env.VERSION || 'v0.0.1';

const packageJson = readPackage(SRC_DIR)

packageJson.version = VERSION.replace('v', '');
packageJson.exports = generatePackageExports();
delete packageJson.scripts;

writePackage(DIST_DIR, packageJson)


