import { resolve } from 'path';
import { readPackage, writePackage, generatePackageExports } from '../buildUtils/packageHelpers.js'

const SRC_DIR = resolve(import.meta.dirname, '..')
const DIST_DIR = resolve(import.meta.dirname, '..', 'dist')

const packageJson = readPackage(SRC_DIR)

packageJson.exports = generatePackageExports()
// TODO add new version

writePackage(DIST_DIR, packageJson)


