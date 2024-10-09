import consoleCall from '.';

describe('console.group silence message', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
