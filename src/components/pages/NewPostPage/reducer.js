import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  newPostRequest: ['data'],
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
  