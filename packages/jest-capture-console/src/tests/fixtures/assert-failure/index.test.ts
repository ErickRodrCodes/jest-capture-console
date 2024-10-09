import consoleCall from './index';

describe('console.assert failure', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
