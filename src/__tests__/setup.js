import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatically clean up rendered React components after each test
afterEach(() => {
  cleanup();
});
