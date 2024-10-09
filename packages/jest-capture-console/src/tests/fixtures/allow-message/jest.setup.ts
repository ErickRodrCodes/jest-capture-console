import { captureConsoleInTest } from '../../../lib/jest-capture-console';
import { ConsoleMethodName } from '../../../types/index';

captureConsoleInTest({
  itShould: 'warn',
  onError: true,
  includeStackTrace: false,
  allowMessage: (msg: string, methodName: ConsoleMethodName) => {
    return (
      methodName === 'error' &&
      /my error message that I do not control/.test(msg)
    );
  },
});
