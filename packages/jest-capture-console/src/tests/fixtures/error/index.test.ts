import consoleCall from './index';

describe('console.error', () => {
  it('does throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
