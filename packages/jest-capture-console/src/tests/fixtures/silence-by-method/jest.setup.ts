import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onWarn: true,
  silenceMessage: (msg, method) => method === 'warn',
});
