const { TEST, NAME } = require('./types')

export function testAction (data) {
  return {
    type: TEST,
    data
  }
}

export function nameAction (data) {
  return {
    type: NAME,
    data
  }
}
