import { REDUX_STATUS_TYPES } from '@/actions/ReduxStatusActions';
import { TYPES } from '@/actions/UserActions';

export const userReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...state, ...payload.user };
    case REDUX_STATUS_TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
