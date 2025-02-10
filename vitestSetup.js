import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import 'regenerator-runtime/runtime';
import * as matchers from 'jest-extended';

import { matchers, createSerializer } from '@emotion/jest';
expect.extend(matchers);
expect.addSnapshotSerializer(createSerializer({ includeStyles: true }));
expect.extend(matchers);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
