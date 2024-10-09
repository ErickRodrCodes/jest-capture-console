import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  itShould: 'warn',
  onAssert: true,
});
