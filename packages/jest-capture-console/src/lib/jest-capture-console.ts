import { afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import * as util from 'util';
import {
  ConsoleGroupMethodName,
  ConsoleMethodName,
  Context,
  DefaultErrorMessageType,
  Options,
} from '../types';

const chalk = {
  red: (str: string) => `\u001B[31m${str}\u001B[39m`,
  gray: (str: string) => `\u001B[90m${str}\u001B[39m`,
  white: (str: string) => `\u001B[37m${str}\u001B[39m`,
  bold: (str: string) => `\u001B[1m${str}\u001B[22m`,
};

const defaultErrorMessage: DefaultErrorMessageType = (methodName, bold) =>
  `Expected test not to call ${bold(`console.${methodName}()`)}.\n\n` +
  `If the ${methodName} is expected, test for it explicitly by mocking it out using ${bold(
    'jest.spyOn'
  )}(console, '${methodName}').mockImplementation() and test that the warning occurs.`;

export const captureConsoleInTest = ({
  itShould = 'warn',
  errorMessage = defaultErrorMessage,
  onAssert = false,
  onDebug = false,
  onError = true,
  onInfo = false,
  onLog = true,
  onTrace = false,
  onWarn = true,
  skipTest,
  silenceMessage,
  allowMessage,
  shouldPrintMessage = false,
  includeStackTrace = true,
}: Options = {}) => {
  const originalConsoleMethods: {
    [key: string]: (...args: unknown[]) => void;
  } = {};
  const flushUnexpectedConsoleCalls = (
    methodName: ConsoleMethodName,
    unexpectedConsoleCallStacks: [string, string][]
  ) => {
    if (unexpectedConsoleCallStacks.length > 0) {
      const messages = unexpectedConsoleCallStacks.map(([stack, message]) => {
        const stackLines = stack.split('\n');
        const stackMap = stackLines
          .map((line, index) => {
            if (index === stackLines.length - 1) {
              return chalk.white(line);
            }
            return chalk.gray(line);
          })
          .join('\n');

        return `${chalk.red(message)}\n${includeStackTrace ? stackMap : ''}`;
      });

      const messageText = errorMessage(methodName, chalk.bold);
      const passMessageText = `${messageText}\n\n${messages.join('\n\n')}`;

      if (itShould === 'warn') {
        if (originalConsoleMethods['warn']) {
          originalConsoleMethods['warn'](passMessageText);
        } else {
          console.warn(passMessageText);
        }
      }

      if (itShould === 'error') {
        throw new Error(passMessageText);
      }
    }
  };
  const groups: string[] = [];

  const patchConsoleMethod = (
    methodName: ConsoleMethodName | ConsoleGroupMethodName
  ) => {
    const unexpectedConsoleCallStacks: [string, string][] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originalConsoleMethods[methodName] = (console as any)[methodName];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalMethod = (console as any)[methodName] as (
      ...args: unknown[]
    ) => void;

    const captureMessage = (format: string, ...args: unknown[]) => {
      const message = util.format(format, ...args);
      const context: Context = {
        group: groups[groups.length - 1],
        groups: [...groups],
      };

      if (
        typeof silenceMessage === 'function' &&
        silenceMessage(message, methodName as ConsoleMethodName, context)
      ) {
        return;
      }

      if (
        typeof allowMessage === 'function' &&
        allowMessage(message, methodName as ConsoleMethodName, context)
      ) {
        originalMethod(format, ...args);
        return;
      }

      if (shouldPrintMessage) {
        originalMethod(format, ...args);
      }

      // capturing stack
      if (['warn', 'error'].includes(itShould)) {
        const error = new Error();
        Error.captureStackTrace(error, captureMessage);
        const { stack } = error;
        if (stack) {
          unexpectedConsoleCallStacks.push([
            stack.substring(stack.indexOf('\n') + 1),
            [...groups, message].join('\n'),
          ]);
        }
      }
    };

    const newAssertMethod = (
      assertion: boolean,
      format?: string,
      ...args: unknown[]
    ) => {
      if (assertion) {
        return;
      }
      captureMessage(format || '', ...args);
    };

    const newGroupMethod = (label?: string) => {
      groups.push(label || '');
    };

    const newGroupEndMethod = () => {
      groups.pop();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const methods: Partial<Record<string, (...args: any[]) => void>> = {
      assert: newAssertMethod,
      debug: captureMessage,
      group: newGroupEndMethod,
      groupCollapsed: newGroupMethod,
      groupEnd: newGroupEndMethod,
    };

    const newMethod = methods[methodName] || captureMessage;

    const canSkipTest = () => {
      const currentTestState = expect.getState();
      const currentTestName = currentTestState.currentTestName;
      const currnetTestPath = currentTestState.testPath;
      if (
        skipTest &&
        skipTest({ testName: currentTestName, testPath: currnetTestPath })
      ) {
        return true;
      }
      return false;
    };

    let shouldSkipTest: boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (console as any)[methodName] = newMethod;

    beforeAll(() => {
      flushUnexpectedConsoleCalls(
        methodName as ConsoleMethodName,
        unexpectedConsoleCallStacks
      );
    });

    beforeEach(() => {
      shouldSkipTest = canSkipTest();
      if (shouldSkipTest) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (console as any)[methodName] = newMethod;
      unexpectedConsoleCallStacks.length = 0;
    });

    afterEach(() => {
      if (shouldSkipTest) return;

      flushUnexpectedConsoleCalls(
        methodName as ConsoleMethodName,
        unexpectedConsoleCallStacks
      );

      console[methodName] = originalMethod;
    });
  };

  beforeEach(() => {
    groups.length = 0;
  });

  if (onAssert) patchConsoleMethod('assert');
  if (onDebug) patchConsoleMethod('debug');
  if (onError) patchConsoleMethod('error');
  if (onInfo) patchConsoleMethod('info');
  if (onLog) patchConsoleMethod('log');
  if (onWarn) patchConsoleMethod('warn');
  if (onTrace) patchConsoleMethod('trace');

  patchConsoleMethod('group');
  patchConsoleMethod('groupCollapsed');
  patchConsoleMethod('groupEnd');
};

export default captureConsoleInTest;
