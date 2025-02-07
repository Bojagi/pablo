import { test, expect } from 'vitest'
import { generatePackageExports } from './packageHelpers'

test('generatePackageExports converts defined exports into package.json export syntax', () => {
  expect(generatePackageExports(['index', 'directory/index', 'file'])).toEqual({
    ".": {
      "import": "./index.js",
      "require": "./index.cjs"
    },
    "./directory": {
      "import": "./directory/index.js",
      "require": "./directory/index.cjs"
    },
     "./file": {
      "import": "./file.js",
      "require": "./file.cjs"
    }
  })
})