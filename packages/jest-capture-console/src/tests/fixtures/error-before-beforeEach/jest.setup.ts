import { captureConsoleInTest } from '../../../lib/jest-capture-console';

captureConsoleInTest();

console.error('console error message out in the wild');
