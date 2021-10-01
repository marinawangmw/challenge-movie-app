import { combineReducers } from 'redux';
import { errorReducer } from '@/reducers/ErrorReducer';
import { statusReducer } from '@/reducers/StatusReducer';
import { userReducer } from '@/reducers/UserReducer';
import { movieListReducer } from '@/reducers/MovieListReducer';
import { reduxStatusReducer } from '@/reducers/ReduxStatusReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  movieList: movieListReducer,
  reduxStatus: reduxStatusReducer,
});
