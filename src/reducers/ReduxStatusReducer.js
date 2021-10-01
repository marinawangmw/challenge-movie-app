import { REDUX_STATUS_TYPES } from '@/actions/ReduxStatusActions';

const INITIAL_STATE = {
  lastFetch: null,
};

export const reduxStatusReducer = (state = INITIAL_STATE, { payload, type }) => {
  if (type === REDUX_STATUS_TYPES.CLEAR_STORE) {
    console.log('redux status reducer: ', state, payload, type);
  }
  switch (type) {
    case REDUX_STATUS_TYPES.SET_LAST_FETCH:
      return {
        ...state,
        lastFetch: payload,
      };

    case REDUX_STATUS_TYPES.CLEAR_STORE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
