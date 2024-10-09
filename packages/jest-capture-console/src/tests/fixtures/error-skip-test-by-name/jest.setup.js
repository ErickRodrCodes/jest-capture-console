import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onError: true,
  skipTest: ({ testName }) => testName === 'console.error skip test does not throw',
})
