import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  itShould: 'error',
  onError: false,
});
