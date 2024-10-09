import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onLog: true,
  onError: false,
  silenceMessage: (msg, fn, context) => /^a group$/.test(context.group),
});
