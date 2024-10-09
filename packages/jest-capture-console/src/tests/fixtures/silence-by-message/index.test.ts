import consoleCall from '.'

describe('console.log silence message by message', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow()
  })
})
