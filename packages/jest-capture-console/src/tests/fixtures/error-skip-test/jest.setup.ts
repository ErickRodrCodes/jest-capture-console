import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onError: true,
  skipTest: ({ testPath }) =>
    /.*tests\/fixtures\/error-skip-test\/index.test.js/.test(testPath ?? ''),
});
