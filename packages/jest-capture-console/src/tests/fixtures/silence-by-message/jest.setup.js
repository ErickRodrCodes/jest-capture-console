import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest({
  onLog: true,
  silenceMessage: (msg) => /^my message$/.test(msg),
})
