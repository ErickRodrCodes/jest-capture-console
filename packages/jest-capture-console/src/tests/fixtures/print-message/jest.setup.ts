import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onError: true,
  shouldPrintMessage: true,
})
