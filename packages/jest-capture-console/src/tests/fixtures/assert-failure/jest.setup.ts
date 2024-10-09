import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  itShould: 'error',
  onAssert: true,
});
