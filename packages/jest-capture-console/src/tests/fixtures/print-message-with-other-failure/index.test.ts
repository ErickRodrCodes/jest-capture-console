import consoleCall from './index';

describe('print message flag with other test failure', () => {
  it('does not throw', () => {
    jest.spyOn(global, 'Error').mockImplementation(() => {
      return new Error('Mocked error');
    });

    expect(consoleCall).toThrow();
  });
});
