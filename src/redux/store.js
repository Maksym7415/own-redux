import { createStore } from '../customRedux'
import someReducer from './reducer';

const store = createStore({someReducer});
console.log(store.getState())

export default store;
