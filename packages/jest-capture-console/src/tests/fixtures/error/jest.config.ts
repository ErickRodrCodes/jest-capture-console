export default {
  displayName: 'error',
  preset: '../../../../../../jest.preset.js',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      { tsconfig: '<rootDir>/../../../../tsconfig.spec.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/packages/jest-capture-console',
};
