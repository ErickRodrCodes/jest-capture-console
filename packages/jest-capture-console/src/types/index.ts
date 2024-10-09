/**
 * Defines the possible actions to be taken.
 * - 'warn': Issue a warning.
 * - 'error': Throw an error.
 * - 'skip': Skip the action.
 */
export type shouldActionType = 'warn' | 'error' | 'skip';

/**
 * Represents the names of console methods.
 * - 'assert': console.assert
 * - 'debug': console.debug
 * - 'error': console.error
 * - 'info': console.info
 * - 'log': console.log
 * - 'trace': console.trace
 * - 'warn': console.warn
 */
export type ConsoleMethodName =
  | 'assert'
  | 'debug'
  | 'error'
  | 'info'
  | 'log'
  | 'trace'
  | 'warn';

/**
 * Represents the names of console group methods.
 * - 'group': console.group
 * - 'groupCollapsed': console.groupCollapsed
 * - 'groupEnd': console.groupEnd
 */
export type ConsoleGroupMethodName = 'group' | 'groupCollapsed' | 'groupEnd';

/**
 * Defines the type for a function that generates a default error message.
 * @param methodName - The name of the console method.
 * @param bold - A function to format a string in bold.
 * @returns The formatted error message.
 */
export type DefaultErrorMessageType = (
  methodName: ConsoleMethodName,
  bold: (str: string) => string
) => string;

/**
 * Represents the context for console groups.
 * @property group - The current group name.
 * @property groups - An array of group names.
 */
export interface Context {
  group: string;
  groups: string[];
}

/**
 * Represents the context for skipping tests.
 * @property testPath - The path of the test file.
 * @property testName - The name of the test.
 */
export interface SkipTestContext {
  testPath?: string;
  testName?: string;
}

/**
 * Represents the options for configuring console capture behavior.
 * @property errorMessage - A function to generate a default error message.
 * @property itShould - The action to be taken ('warn', 'error', 'skip').
 * @property onAssert - Whether to capture console.assert calls.
 * @property onDebug - Whether to capture console.debug calls.
 * @property onError - Whether to capture console.error calls.
 * @property onInfo - Whether to capture console.info calls.
 * @property onLog - Whether to capture console.log calls.
 * @property onTrace - Whether to capture console.trace calls.
 * @property onWarn - Whether to capture console.warn calls.
 * @property skipTest - A function to determine if a test should be skipped.
 * @property silenceMessage - A function to determine if a message should be silenced.
 * @property allowMessage - A function to determine if a message should be allowed.
 * @property shouldPrintMessage - Whether to print the message.
 * @property includeStackTrace - Whether to include the stack trace.
 */
export interface Options {
  errorMessage?: DefaultErrorMessageType;
  itShould?: shouldActionType;
  onAssert?: boolean;
  onDebug?: boolean;
  onError?: boolean;
  onInfo?: boolean;
  onLog?: boolean;
  onTrace?: boolean;
  onWarn?: boolean;
  skipTest?: (context: SkipTestContext) => boolean;
  silenceMessage?: (
    message: string,
    methodName: ConsoleMethodName,
    context: Context
  ) => boolean;
  allowMessage?: (
    message: string,
    methodName: ConsoleMethodName,
    context: Context
  ) => boolean;
  shouldPrintMessage?: boolean;
  includeStackTrace?: boolean;
}
