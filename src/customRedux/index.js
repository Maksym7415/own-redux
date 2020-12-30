class Redux {

  // singletone approach realisation
  static #instance;

  // cause we are not able to make constructor private it's smth. like pollyfill for protecting this class from creating with new more than one time
  constructor() {
    if (Redux.#instance) return new Error('You are not able to create instances via new');
  }

  static getInstance() {
    if (!Redux.#instance) {
      Redux.#instance = new Redux();
    }

    return Redux.#instance;
  }
  // --------------------------------->

  #reducer = {}; // initial reducers object
  #state = {}; // initial state object
  #subscriptions = []; // store subscriptions

  subscribe(state, callback) {
    this.#subscriptions.push(callback)
  };

  // initializing reducers and states
  createReducer(reducer) {
    for (let key in reducer) {
      this.#reducer[key] = reducer[key];
      this.#state[key] = reducer[key](undefined, {});
    }
  }

  // subscribe

  // changing states
  dispatch(action, cb) {
    for (let key in this.#reducer) {
      this.#state[key] = this.#reducer[key](this.#state[key], action)
    }
    // this.subscribe && this.subscribe()
    this.#subscriptions.forEach((cb) => cb())
  }

  // states getter
  getState() {
    return this.#state
  }
}

// creating store instance
export const store = Redux.getInstance();

// initializing reducers
export function createStore(reducer) {
  store.createReducer(reducer)
  return store;
}

// dispatch method
export function dispatch(action) {
  store.dispatch(action)
}

export const state = store.getState();
