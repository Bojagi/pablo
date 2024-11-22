import f from 'fs';
import path from 'path';

const styleFiles = fs
  .readdirSync(path.join(__dirname, 'src'))
  .filter((file) => {
    if (fs.lstatSync(path.join(__dirname, 'src', file)).isDirectory()) {
      try {
        return !!fs.statSync(path.join(__dirname, 'src', file, 'styles.ts'));
      } catch {
        return false;
      }
    }
    return false;
  })
  .map((file) => path.join(__dirname, 'src', file, 'styles.ts'));

const config = {
  // preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/index.ts', '!**/*.stories.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts', ...styleFiles],
};

export default config;
