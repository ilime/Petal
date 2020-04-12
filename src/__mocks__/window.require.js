global.require = jest.fn((name) => {
  if (name === 'electron') {
    return {
      shell: jest.fn(),
    }
  }
})
