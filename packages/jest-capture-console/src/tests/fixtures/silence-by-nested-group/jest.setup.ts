import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  itShould: 'error',
  onLog: true,
  onError: false,
  silenceMessage: (msg, fn, context) => {
    console.log({ context });
    return context.groups.includes('group one');
  },
});
