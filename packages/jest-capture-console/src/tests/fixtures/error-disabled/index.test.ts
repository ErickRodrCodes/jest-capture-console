import consoleCall from '.';

describe('console.error disabled', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
