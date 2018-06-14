import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  newPostRequest: ['contentType', 'data'],
  newPostSuccess: ['payload'],
  newPostFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  newPost: {
    isFetching: false,
    payload: null,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const newPostRequest = (state) =>
  state.mergeDeep({ newPost: { isFetching: true, error: null } });

export const newPostSuccess = (state, { payload }) =>
  state.mergeDeep({ newPost: { isFetching: false, payload, error: null } });

export const newPostFailure = (state, { error }) =>
  state.mergeDeep({ newPost: { isFetching: false, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.NEW_POST_REQUEST]: newPostRequest,
  [Types.NEW_POST_SUCCESS]: newPostSuccess,
  [Types.NEW_POST_FAILURE]: newPostFailure,
});
