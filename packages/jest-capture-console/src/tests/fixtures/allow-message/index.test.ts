import consoleCall from './index';

describe('console.error display message but not fail (allowMessage)', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow();
  });
});
