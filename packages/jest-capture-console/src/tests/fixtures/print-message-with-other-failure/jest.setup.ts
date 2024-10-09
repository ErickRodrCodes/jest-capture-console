import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  itShould: 'warn',
  onError: true,
  shouldPrintMessage: true,
});
