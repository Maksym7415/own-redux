const { TEST, NAME } = require('./types');

const initialState = {
  testState: {
    someData: 'Some Data'
  },
  anotherState: {
    data: 'Another state data'
  }
}

function someReducer (state=initialState, action) {
  switch (action.type) {
    case TEST: {
      return {
        ...state,
        testState: {
          someData: action.data
        },
      }
    }

    case NAME: {
      return {
        ...state,
        name: action.data,
      }
    }

    default: return state;
  }
};

export default someReducer;
