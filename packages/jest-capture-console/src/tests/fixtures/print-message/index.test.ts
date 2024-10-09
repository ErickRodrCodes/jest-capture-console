import consoleCall from '.'

describe('print message flag', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow()
  })
})
