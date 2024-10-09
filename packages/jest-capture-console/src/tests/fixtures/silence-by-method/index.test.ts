import consoleCall from '.';

describe('console.warn silence message by method', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
