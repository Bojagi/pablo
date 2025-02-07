// import fs from 'fs';
// import path from 'path';

// const __dirname = import.meta.dirname;

// const styleFiles = fs
//   .readdirSync(path.join(__dirname, 'src'))
//   .filter((file) => {
//     if (fs.lstatSync(path.join(__dirname, 'src', file)).isDirectory()) {
//       try {
//         return !!fs.statSync(path.join(__dirname, 'src', file, 'styles.ts'));
//       } catch {
//         return false;
//       }
//     }
//     return false;
//   })
//   .map((file) => path.join(__dirname, 'src', file, 'styles.ts'));

const config = {
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/index.ts', '!**/*.stories.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  snapshotSerializers: [
    '@emotion/jest/serializer',
  ],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
};

export default config;
