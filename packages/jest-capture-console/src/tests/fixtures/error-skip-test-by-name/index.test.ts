import consoleCall from '.'

describe('console.error skip test', () => {
  it('does not throw', () => {
    expect(consoleCall).not.toThrow()
  })
})
