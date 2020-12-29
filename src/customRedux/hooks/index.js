import {state, dispatch} from '../';


export const useSelector = (cb) => cb(state);

export const useDispatch = () => dispatch 