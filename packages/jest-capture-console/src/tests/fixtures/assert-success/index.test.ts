import consoleCall from '.';

describe('console.assert success', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
