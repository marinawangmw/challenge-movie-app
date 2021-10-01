export const REDUX_STATUS_TYPES = {
  SET_LAST_FETCH: 'SET_LAST_FETCH',
  CLEAR_STORE: 'CLEAR_STORE',
};

export const setLastFetch = (date) => ({
  type: REDUX_STATUS_TYPES.SET_LAST_FETCH,
  payload: date,
});

export const clearStore = () => ({
  type: REDUX_STATUS_TYPES.CLEAR_STORE,
  payload: null,
});
